import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError.js";
import { NewsletterRepository } from "../repositories/newsletter.repository.js";
import type { Prisma } from "@prisma/client";

export function normalizeEmail(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new ApiError(400, "Invalid email");
  }

  return normalizedEmail;
}

class NewsletterService {
  private readonly newsletterRepository: NewsletterRepository;
  private readonly transporter: nodemailer.Transporter | null;

  constructor() {
    this.newsletterRepository = new NewsletterRepository();
    this.transporter = this.createTransporter();
  }

  private createTransporter() {
    const host = process.env.SMTP_HOST;

    if (!host) {
      return null;
    }

    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });
  }

  private async sendWelcomeEmail(email: string) {
    if (!this.transporter) {
      console.warn("SMTP is not configured. Newsletter email was skipped.");
      return;
    }

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "newsletter@heritagesrilanka.com";

    await this.transporter.sendMail({
      from,
      to: email,
      subject: "Welcome to Heritage Sri Lanka Newsletter",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8f6f1; padding:30px; color:#203229;">
          <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #eadfc4;">
            <div style="background:#1c5f46; padding:28px 36px; color:#ffffff;">
              <h1 style="margin:0; font-size:30px; font-family:Georgia, serif;">Heritage Sri Lanka</h1>
              <p style="margin:6px 0 0; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#efe1bc;">Newsletter</p>
            </div>
            <div style="padding:34px 36px;">
              <p style="font-size:20px; margin:0 0 12px; color:#2a4a3a;">Welcome to the Heritage Sri Lanka community!</p>
              <p style="font-size:15px; line-height:1.7; color:#56513c;">
                Thank you for subscribing to our newsletter. You are now part of a growing circle of travellers, learners, and heritage lovers discovering the stories, culture, and living legacy of Sri Lanka.
              </p>
              <div style="margin:28px 0; padding:24px; background:#fbfaf7; border-left:4px solid #c89b3c; border-radius:10px;">
                <p style="margin:0 0 10px; font-size:15px; font-weight:bold; color:#1c5f46;">What you can expect</p>
                <p style="margin:0; line-height:1.72; color:#56513c;">
                  Heritage stories, destination highlights, conservation updates, cultural guides, travel inspiration, and upcoming events from across the island.
                </p>
              </div>
              <p style="font-size:15px; color:#56513c; line-height:1.7;">
                We look forward to sharing the island’s rich heritage with you.
              </p>
              <p style="margin-top:24px; color:#1c5f46; font-weight:bold;">Warm regards,<br />Heritage Sri Lanka Team</p>
            </div>
          </div>
        </div>
      `,
      text: "Welcome to Heritage Sri Lanka Newsletter!\n\nThank you for subscribing. You are now part of a growing circle of travellers, learners, and heritage lovers discovering the stories, culture, and living legacy of Sri Lanka.\n\nWe look forward to sharing heritage stories, destination highlights, conservation updates, cultural guides, travel inspiration, and upcoming events from across the island.\n\nWarm regards,\nHeritage Sri Lanka Team",
    });
  }

  async subscribe(email: string) {
    const normalizedEmail = normalizeEmail(email);
    const existingSubscriber = await this.newsletterRepository.findByEmail(normalizedEmail);

    if (existingSubscriber) {
      await this.newsletterRepository.update(existingSubscriber.id, {
        status: "active",
      });

      return {
        success: true,
        message: "You are already subscribed. Your newsletter status has been refreshed.",
        data: {
          email: normalizedEmail,
          status: "active",
        },
      };
    }

    const subscriber = await this.newsletterRepository.create({
      email: normalizedEmail,
      status: "active",
    });

    try {
      await this.sendWelcomeEmail(normalizedEmail);
    } catch (error) {
      console.error("Failed to send newsletter confirmation email", error);
    }

    return {
      success: true,
      message: "Successfully subscribed to the newsletter.",
      data: {
        id: subscriber.id,
        email: subscriber.email,
        status: subscriber.status,
      },
    };
  }

  async getSubscribers() {
    return this.newsletterRepository.findAll();
  }

  async updateSubscriber(id: number, data: Prisma.NewsletterSubscriberUpdateInput) {
    const subscriber = await this.newsletterRepository.findById(id);

    if (!subscriber) {
      throw new ApiError(404, "Newsletter subscriber not found");
    }

    if (typeof data.email === "string") {
      data.email = normalizeEmail(data.email);
    }

    return this.newsletterRepository.update(id, data);
  }

  async deleteSubscriber(id: number) {
    const subscriber = await this.newsletterRepository.findById(id);

    if (!subscriber) {
      throw new ApiError(404, "Newsletter subscriber not found");
    }

    await this.newsletterRepository.delete(id);

    return {
      success: true,
      message: "Newsletter subscriber deleted successfully.",
    };
  }

  async getStats() {
    const [total, active] = await Promise.all([
      this.newsletterRepository.countAll(),
      this.newsletterRepository.countActive(),
    ]);

    return {
      total,
      active,
    };
  }
}

export const newsletterService = new NewsletterService();