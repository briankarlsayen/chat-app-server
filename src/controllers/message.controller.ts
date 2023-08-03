import { Request, Response, NextFunction } from 'express';
import Message, { TMessage } from '../models/message.model';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body, room, user } = req.body;

  // * build profile object based on TUser
  const messageFields: TMessage = {
    body,
    room,
    user,
  };
  try {
    const user = await Message.create(messageFields);
    if (!user) return res.status(422).json({ message: 'Unable to create' });
    res.status(201).json({ message: 'Successfully create', success: true });
  } catch (error) {
    next(error);
  }
};

export const displayMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await Message.find({ isDeleted: false }).exec();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const archiveMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await Message.findByIdAndUpdate(
      { id },
      { isDeleted: false }
    ).exec();
    if (!user) return res.status(422).json({ message: 'Unable to archive' });
    res.status(201).json({ message: 'Successfully updated', success: true });
  } catch (error) {
    next(error);
  }
};
