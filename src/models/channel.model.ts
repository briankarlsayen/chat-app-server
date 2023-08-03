import { Document, model, Schema } from 'mongoose';
/**
 * Type to model the User Schema for TypeScript.
 * @param body:string
 * @param channel:string
 * @param user:string
 */

type IUser = {
  name: string;
  token: string;
};

export type TChannel = {
  label: string;
  users: IUser[];
  isDeleted?: boolean;
};

export interface IChannel extends TChannel, Document {}

const channelSchema: Schema = new Schema(
  {
    label: {
      type: String,
      default: '',
    },
    users: {
      type: [
        {
          name: String,
          token: String,
        },
      ],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Channel = model<IChannel>('Channel', channelSchema);

export default Channel;
