import { Document, model, Schema } from 'mongoose';
/**
 * Type to model the User Schema for TypeScript.
 * @param to:string
 * @param from:string
 * @param subject:string
 * @param body:string
 * @param type:string
 * @param success:boolean
 */

export type TMail = {
  to: string[];
  from: string;
  subject: string;
  body: string;
  type?: string;
  sucess?: boolean;
};

export interface IMail extends TMail, Document { }

const mailSchema: Schema = new Schema(
  {
    to: {
      type: [String],
      default: null,
    },
    from: {
      type: String,
      default: null,
    },
    subject: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'default'
    },
    sucess: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Mail = model<IMail>('Mail', mailSchema);

export default Mail;
