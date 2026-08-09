import type { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Key used in the Setting table to track when admin last viewed newsletter subscribers
const NEWSLETTER_LAST_SEEN_KEY = "newsletter_last_seen_at";

/** Helper: get the newsletter last-seen timestamp from the Setting table via raw SQL */
async function getNewsletterLastSeen(): Promise<Date> {
  try {
    const rows = await prisma.$queryRaw<{ value: string }[]>(
      Prisma.sql`SELECT value FROM Setting WHERE \`key\` = ${NEWSLETTER_LAST_SEEN_KEY} LIMIT 1`
    );
    if (rows.length > 0 && rows[0].value) {
      return new Date(rows[0].value);
    }
  } catch {
    // table may not exist yet or query failed
  }
  // Default: last 24 hours
  return new Date(Date.now() - 24 * 60 * 60 * 1000);
}

/** Helper: upsert the newsletter last-seen timestamp via raw SQL */
async function setNewsletterLastSeen(value: string): Promise<void> {
  try {
    await prisma.$executeRaw(
      Prisma.sql`
        INSERT INTO Setting (\`key\`, value, createdAt, updatedAt)
        VALUES (${NEWSLETTER_LAST_SEEN_KEY}, ${value}, NOW(), NOW())
        ON DUPLICATE KEY UPDATE value = ${value}, updatedAt = NOW()
      `
    );
  } catch {
    // silently ignore if table not ready
  }
}

export const getNotificationSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lastSeenAt = await getNewsletterLastSeen();

    const [unreadContactsCount, newSubscribersCount, recentContacts, recentSubscribers] =
      await Promise.all([
        prisma.contactMessage.count({
          where: { status: "unread" },
        }),
        prisma.newsletterSubscriber.count({
          where: {
            createdAt: { gte: lastSeenAt },
            status: "SUBSCRIBED",
          },
        }),
        prisma.contactMessage.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        }),
        prisma.newsletterSubscriber.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        }),
      ]);

    const formattedNotifications = [
      ...recentContacts.map((c) => ({
        id: `contact-${c.id}`,
        type: "contact",
        title: `Contact: ${c.name}`,
        subtitle: c.subject || c.message.substring(0, 40),
        time: c.createdAt,
        isRead: c.status !== "unread",
        link: "/admin/contact",
      })),
      ...recentSubscribers.map((s) => ({
        id: `news-${s.id}`,
        type: "newsletter",
        title: `Newsletter Subscriber`,
        subtitle: s.email,
        time: s.createdAt,
        isRead: false,
        link: "/admin/newsletter",
      })),
    ].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    ).slice(0, 8);

    res.json({
      success: true,
      data: {
        unreadContactsCount,
        newSubscribersCount,
        notifications: formattedNotifications,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark all unread contact messages as read — clears the badge count.
 */
export const markContactsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.contactMessage.updateMany({
      where: { status: "unread" },
      data: { status: "read" },
    });

    res.json({ success: true, message: "All contact messages marked as read." });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark newsletter subscriber count as seen — resets the badge count.
 * Records the current timestamp in the Setting table via raw SQL.
 */
export const markSubscribersRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await setNewsletterLastSeen(new Date().toISOString());
    res.json({ success: true, message: "Newsletter subscribers marked as seen." });
  } catch (error) {
    next(error);
  }
};
