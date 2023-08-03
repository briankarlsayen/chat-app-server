import { Request, Response, NextFunction } from 'express';
import Channel, { TChannel } from '../models/channel.model';

export const displayChannels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  try {
    const message = await Channel.find({
      'users.token': token,
      isDeleted: false,
    }).exec();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const viewUserChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label, token } = req.body;
  try {
    const channel = await Channel.findOne({
      label,
      'users.token': token,
      isDeleted: false,
    })
      .lean()
      .exec();

    let user;
    if (channel) {
      user = channel.users?.find((user) => user.token === token);
    }

    const response = {
      label: channel?.label,
      ...user,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const joinChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label, name, token } = req.body;
  try {
    const query = {
      label,
      isDeleted: false,
    };
    const options = { upsert: true, new: true };

    const alreadyJoined = await Channel.findOne({
      label,
      'users.token': token,
    }).exec();

    if (alreadyJoined)
      return res.status(200).json({ channelId: alreadyJoined._id });

    const channel = await Channel.findOneAndUpdate(
      { ...query },
      { label, $addToSet: { users: { name, token } } },
      { ...options }
    ).exec();
    if (!channel)
      return res.status(422).json({ message: 'Unable to join channel' });
    res.status(201).json({ message: 'Successfully joined', success: true });
  } catch (error) {
    console.log('err', error);
    next(error);
  }
};

export const leaveChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label } = req.params;
  const { token } = req.body;
  try {
    const channel = await Channel.findOneAndUpdate(
      { label },
      { $pull: { users: { token } } }
    ).exec();
    if (!channel) return res.status(422).json({ message: 'Unable to leave' });
    res.status(201).json({ message: 'Successfully left', success: true });
  } catch (error) {
    next(error);
  }
};

export const archiveChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label } = req.params;
  try {
    const user = await Channel.findOneAndUpdate(
      { label },
      { isDeleted: false }
    ).exec();
    if (!user) return res.status(422).json({ message: 'Unable to archive' });
    res.status(201).json({ message: 'Successfully updated', success: true });
  } catch (error) {
    next(error);
  }
};
