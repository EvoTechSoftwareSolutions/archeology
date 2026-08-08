import nodemailer from "nodemailer";
import { ContactRepository } from "../repositories/contact.repository.js";
import { ApiError } from "../utils/ApiError.js";

type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");

class ContactService {
  private readonly contactRepository: ContactRepository;
  private readonly transporter: nodemailer.Transporter | null;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.transporter = this.createTransporter();
  }

  private createTransporter() {
    if (!process.env.SMTP_HOST) {
      return null;
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });
  }

  private async sendAdminEmail(message: ContactMessageInput) {
    if (!this.transporter) {
      console.warn(
        "SMTP is not configured. Contact notification email was skipped.",
      );
      return;
    }

    const from =
      process.env.SMTP_FROM ||
      process.env.SMTP_USER ||
      "contact@heritagesrilanka.com";
    const adminEmails = await this.contactRepository.findAdminEmails();
    const fallbackEmail =
      process.env.CONTACT_TO_EMAIL ||
      process.env.SMTP_USER ||
      process.env.ADMIN_EMAIL;
    const to =
      adminEmails.map((admin) => admin.email).join(",") || fallbackEmail;

    if (!to) {
      console.warn(
        "No contact recipient email is configured. Contact notification email was skipped.",
      );
      return;
    }

    await this.transporter.sendMail({
      from,
      to,
      replyTo: message.email,
      subject: `New contact message: ${message.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color:#2a4a3a">New Contact Message</h2>
          <p><strong>Name:</strong> ${message.name}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          <p><strong>Phone:</strong> ${message.phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${message.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
      text: `Name: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\n${message.message}`,
    });
  }

  private async sendUserAcknowledgementEmail(message: ContactMessageInput) {
    if (!this.transporter) {
      console.warn(
        "SMTP is not configured. Contact confirmation email was skipped.",
      );
      return;
    }

    const from =
      process.env.SMTP_FROM ||
      process.env.SMTP_USER ||
      "contact@heritagesrilanka.com";

    const safeName = escapeHtml(message.name);
    const safeSubject = escapeHtml(message.subject);
    const safeMessage = escapeHtml(message.message).replace(/\n/g, "<br>");

    await this.transporter.sendMail({
      from,
      to: message.email,
      subject: "Thank you for reaching out to Heritage Sri Lanka",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8f6f1; padding:30px; color:#203229;">
          <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #eadfc4;">
            <div style="background:#1c5f46; padding:28px 36px; color:#ffffff;">
              <h1 style="margin:0; font-size:30px; font-family:Georgia, serif;">Heritage Sri Lanka</h1>
              <p style="margin:6px 0 0; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#efe1bc;">Visitor Services</p>
            </div>
            <div style="padding:34px 36px;">
              <p style="font-size:20px; margin:0 0 12px; color:#2a4a3a;">Dear ${safeName},</p>
              <p style="font-size:15px; line-height:1.7; color:#56513c;">
                Thank you for contacting Heritage Sri Lanka. We have received your message and our team will review it as soon as possible.
              </p>
              <div style="margin:28px 0; padding:20px; background:#fbfaf7; border-left:4px solid #c89b3c; border-radius:10px;">
                <p style="margin:0 0 8px;"><strong>Subject:</strong> ${safeSubject}</p>
                <p style="margin:0 0 8px;"><strong>Submitted email:</strong> ${escapeHtml(message.email)}</p>
                <p style="margin:0;"><strong>Message summary:</strong></p>
                <p style="margin:8px 0 0; color:#4c4538; line-height:1.7;">${safeMessage}</p>
              </div>
              <p style="font-size:15px; color:#56513c; line-height:1.7;">
                If your enquiry requires a quicker response, please keep an eye on your inbox. A member of our team will follow up with you soon.
              </p>
              <p style="margin-top:24px; color:#1c5f46; font-weight:bold;">Warm regards,<br />Heritage Sri Lanka Team</p>
            </div>
          </div>
        </div>
      `,
      text: `Dear ${message.name},\n\nThank you for contacting Heritage Sri Lanka. We have received your message and our team will review it as soon as possible.\n\nSubject: ${message.subject}\nSubmitted email: ${message.email}\n\nMessage:\n${message.message}\n\nWarm regards,\nHeritage Sri Lanka Team`,
    });
  }

  async createMessage(input: ContactMessageInput) {
    const message = await this.contactRepository.create({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      subject: input.subject.trim(),
      message: input.message.trim(),
      status: "unread",
    });

    try {
      await this.sendAdminEmail(input);
      await this.sendUserAcknowledgementEmail(input);
    } catch (error) {
      console.error("Failed to send contact notification email", error);
    }

    return {
      success: true,
      message: "Your message has been sent successfully.",
      data: message,
    };
  }

  getRecentMessages() {
    return this.contactRepository.findRecent();
  }

  getMessages() {
    return this.contactRepository.findAll();
  }

  async updateMessageStatus(id: number, status: string) {
    const allowed = ["unread", "read", "replied"];

    if (!allowed.includes(status)) {
      throw new ApiError(400, "Invalid status");
    }

    const message = await this.contactRepository.findById(id);

    if (!message) {
      throw new ApiError(404, "Contact message not found");
    }

    return this.contactRepository.update(id, {
      status,
    });
  }

  async markAsRead(id: number) {
    const message = await this.contactRepository.findById(id);

    if (!message) {
      throw new ApiError(404, "Contact message not found");
    }

    return this.contactRepository.update(id, {
      status: "read",
    });
  }
  
  async deleteMessage(id: number) {
    const message = await this.contactRepository.findById(id);

    if (!message) {
      throw new ApiError(404, "Contact message not found");
    }

    await this.contactRepository.delete(id);

    return {
      success: true,
      message: "Contact message deleted successfully.",
    };
  }

  async getStats() {
    const [total, unread] = await Promise.all([
      this.contactRepository.countAll(),
      this.contactRepository.countUnread(),
    ]);

    return { total, unread };
  }

  async replyMessage(id: number, replyText: string) {
    const message = await this.contactRepository.findById(id);

    if (!message) {
      throw new ApiError(404, "Message not found");
    }

    if (!this.transporter) {
      throw new ApiError(500, "SMTP not configured");
    }

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,

      to: message.email,

      subject: `Re: ${message.subject || "Contact Message"}`,

      text: `Hello ${message.name},

Admin reply:

${replyText}

Original message:

${message.message}`,
    });

    return this.contactRepository.update(id, {
      status: "replied",
    });
  }
}

export const contactService = new ContactService();
