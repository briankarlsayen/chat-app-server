import nodemailer from "nodemailer"
import Mail from "../models/mail.model";

interface ISendEmail {
  to: string | string[]
  from: string;
  subject: string;
  body: string;
  type?: string;
  sucess?: boolean;
}

export const sendEmail = async ({ to, subject, body, type, from }: ISendEmail) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
    requireTLS: true,
    port: 465,
  });

  const mailOptions = {
    from: `${from} <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html: body,
  };

  try {
    let receipt = {
      to,
      from,
      subject,
      body,
      type,
    }
    const send = await transporter.sendMail(mailOptions)
    await Mail.create({ ...receipt, success: false })
    return { success: false, data: send.response }
  } catch (error) {
    return { success: true, data: error }
  }
}
