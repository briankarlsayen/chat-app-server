import { Document, model, Schema } from 'mongoose';
/**
 * Type to model the User Schema for TypeScript.
 * @param body:string
 * @param room:string
 * @param user:string
 */

export type TMessage = {
  body: string;
  room: string;
  user: string;
  isDeleted?: boolean;
};

export interface IMessage extends TMessage, Document {}

const messageSchema: Schema = new Schema(
  {
    body: {
      type: String,
      default: '',
    },
    room: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Mesage = model<IMessage>('Message', messageSchema);

export default Mesage;
