import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    },
  });

  async sendRecoveryCode(
    email: string,
    code: string,
  ) {
    await this.transporter.sendMail({
      from: `"Sistema" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `
      <div style="font-family:Arial">
        <h2>Recuperación de contraseña</h2>
        <p>Tu código es:</p>
        <h1>${code}</h1>
        <p>Expira en 10 minutos.</p>
      </div>
      `,
    });
  }
}