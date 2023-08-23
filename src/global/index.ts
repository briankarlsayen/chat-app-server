import { Router } from "express";
import { sendEmail } from "../utils/sendEmail";
import { Request, Response, NextFunction } from 'express';
import { checkingValidation } from "../utils/formValidation";

const router = Router();

router.post("/sendmail", async (req: Request,
  res: Response,
  next: NextFunction) => {
  const { to, subject, body, type, from } = req.body

  const requiredField = {
    subject, body, from
  };

  try {
    const error_field = checkingValidation(requiredField);
    if (error_field) {
      return res.status(422).json({ message: error_field });
    }
    let toArr = []
    if (typeof to === 'string') {
      toArr.push(to)
    } else if (Array.isArray(to)) {
      toArr = [...to]
    } else {
      return res.status(422).json({ message: 'Params to should be an array' })
    }

    await sendEmail({ to: toArr, subject, body, type, from })
    res.status(201).json({ success: true, message: 'Successfully send' })
  } catch (error) {
    next(error)
  }
});

export default router;