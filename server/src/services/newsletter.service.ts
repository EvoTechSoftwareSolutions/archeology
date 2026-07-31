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
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color:#2a4a3a">Thank you for subscribing</h2>
          <p>You are now subscribed to the Heritage Sri Lanka newsletter.</p>
          <p>Expect updates about heritage stories, discoveries, and upcoming events.</p>
        </div>
      `,
      text: "Thank you for subscribing to the Heritage Sri Lanka newsletter.",
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
