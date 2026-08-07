import type { Request, Response, NextFunction } from "express";
import { newsletterService } from "../services/newsletter.service.js";

class NewsletterController {
  async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await newsletterService.subscribe(req.body.email);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSubscribers(req: Request, res: Response, next: NextFunction) {
    try {
      const subscribers = await newsletterService.getSubscribers();

      res.status(200).json({
        success: true,
        data: subscribers,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSubscriber(req: Request, res: Response, next: NextFunction) {
    try {
      const subscriber = await newsletterService.updateSubscriber(Number(req.params.id), req.body);

      res.status(200).json({
        success: true,
        data: subscriber,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSubscriber(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await newsletterService.deleteSubscriber(Number(req.params.id));

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await newsletterService.getStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const newsletterController = new NewsletterController();