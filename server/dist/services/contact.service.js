import nodemailer from "nodemailer";
import { ContactRepository } from "../repositories/contact.repository.js";
import { ApiError } from "../utils/ApiError.js";
class ContactService {
    constructor() {
        this.contactRepository = new ContactRepository();
        this.transporter = this.createTransporter();
    }
    createTransporter() {
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
    async sendAdminEmail(message) {
        if (!this.transporter) {
            console.warn("SMTP is not configured. Contact notification email was skipped.");
            return;
        }
        const from = process.env.SMTP_FROM || process.env.SMTP_USER || "contact@heritagesrilanka.com";
        const adminEmails = await this.contactRepository.findAdminEmails();
        const fallbackEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || process.env.ADMIN_EMAIL;
        const to = adminEmails.map((admin) => admin.email).join(",") || fallbackEmail;
        if (!to) {
            console.warn("No contact recipient email is configured. Contact notification email was skipped.");
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
          <p><strong>Subject:</strong> ${message.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
            text: `Name: ${message.name}\nEmail: ${message.email}\nSubject: ${message.subject}\n\n${message.message}`,
        });
    }
    async createMessage(input) {
        const message = await this.contactRepository.create({
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            subject: input.subject.trim(),
            message: input.message.trim(),
            status: "unread",
        });
        try {
            await this.sendAdminEmail(input);
        }
        catch (error) {
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
    async updateMessageStatus(id, status) {
        const message = await this.contactRepository.findById(id);
        if (!message) {
            throw new ApiError(404, "Contact message not found");
        }
        return this.contactRepository.update(id, { status });
    }
    async deleteMessage(id) {
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
}
export const contactService = new ContactService();
