import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const messageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const sendNotificationEmail = async (name: string, email: string, phone: string | undefined, message: string) => {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.warn("SMTP is not configured. Contact notification email was skipped.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "contact@heritagesrilanka.com";

  // Auto-reply to user
  await transporter.sendMail({
    from,
    to: email,
    subject: "Thank you for contacting Heritage Sri Lanka",
    text: `Hello ${name},\n\nWe have received your message and will get back to you shortly.\n\nYour message:\n${message}`,
  }).catch(err => console.error("Auto-reply failed:", err));

  // Notification to Admin
  const adminEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  if (adminEmail) {
    await transporter.sendMail({
      from,
      to: adminEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }).catch(err => console.error("Admin notification failed:", err));
  }
};

export const persistContactMessageAndSendNotification = async ({
  createMessage,
  sendNotification,
}: {
  createMessage: () => Promise<any>;
  sendNotification: () => Promise<void>;
}) => {
  const newMessage = await createMessage();
  await sendNotification();
  return newMessage;
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const parsedData = messageSchema.parse(req.body);

    const newMessage = await persistContactMessageAndSendNotification({
      createMessage: async () => prisma.contactMessage.create({
        data: {
          name: parsedData.name,
          email: parsedData.email,
          phone: parsedData.phone,
          subject: parsedData.subject || "No Subject",
          message: parsedData.message,
        },
      }),
      sendNotification: async () => {
        try {
          await sendNotificationEmail(parsedData.name, parsedData.email, parsedData.message);
        } catch (error) {
          console.error("Contact email delivery failed", error);
        }
      },
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: error.issues[0].message });
      return;
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const total = await prisma.contactMessage.count();
    const unread = await prisma.contactMessage.count({ where: { status: "unread" } });
    const read = await prisma.contactMessage.count({ where: { status: "read" } });
    const resolved = await prisma.contactMessage.count({ where: { status: "archived" } });

    res.status(200).json({
      success: true,
      data: { total, unread, read, resolved },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateMessageStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.contactMessage.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const replyMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || replyText.trim() === "") {
       res.status(400).json({ success: false, message: "Reply text is required" });
       return;
    }

    const message = await prisma.contactMessage.findUnique({
      where: { id: Number(id) },
    });

    if (!message) {
       res.status(404).json({ success: false, message: "Message not found" });
       return;
    }

    const host = process.env.SMTP_HOST;
    if (!host) {
       res.status(500).json({ success: false, message: "SMTP is not configured on the server." });
       return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "contact@heritagesrilanka.com";

    await transporter.sendMail({
      from,
      to: message.email,
      subject: `Re: ${message.subject || "Your Contact Message"}`,
      text: `Hello ${message.name},\n\nAdmin has replied to your message:\n\n${replyText}\n\n--\nOriginal Message:\n${message.message}`,
    });

    // Mark as resolved/archived after replying
    const updated = await prisma.contactMessage.update({
      where: { id: Number(id) },
      data: { status: "archived" },
    });

    res.status(200).json({ success: true, message: "Reply sent successfully", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error while sending reply" });
  }
};