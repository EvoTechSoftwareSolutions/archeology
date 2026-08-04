import type { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contact.service.js";

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await contactService.createMessage(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messages = await contactService.getMessages();

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stats = await contactService.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const { status } = req.body;

    const updated = await contactService.updateMessageStatus(id, status);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const result = await contactService.deleteMessage(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const replyMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const { replyText } = req.body;

    const result = await contactService.replyMessage(id, replyText);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
