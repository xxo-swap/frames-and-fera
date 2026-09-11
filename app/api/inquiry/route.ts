// app/api/inquiry/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientNames, phone, eventDate, location, service, notes } = body;

    if (!clientNames || !phone || !eventDate || !location || !service) {
      return NextResponse.json(
        { error: 'Missing required inquiry fields.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Frames & Fera Archive" <${process.env.GMAIL_USER}>`,
      to: 'framesandfera@gmail.com',
      replyTo: process.env.GMAIL_USER,
      subject: `New Wedding Commission: ${clientNames}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #faf8f5; color: #1a1715; border: 1px solid #e0d8cc;">
          <h2 style="font-size: 22px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 24px; border-bottom: 1px solid #c4a47c; padding-bottom: 12px;">
            New Wedding Inquiry
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 35%; color: #6e645a; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Client Name(s):</td>
              <td style="padding: 10px 0; font-size: 15px;">${clientNames}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #6e645a; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Phone / WhatsApp:</td>
              <td style="padding: 10px 0; font-size: 15px;"><a href="tel:${phone}" style="color: #1a1715; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #6e645a; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Event Date / Season:</td>
              <td style="padding: 10px 0; font-size: 15px;">${eventDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #6e645a; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Venue & Location:</td>
              <td style="padding: 10px 0; font-size: 15px;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #6e645a; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px;">Commissioned Service:</td>
              <td style="padding: 10px 0; font-size: 15px; font-weight: bold; color: #8c6d46;">${service}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0d8cc;">
            <p style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px; color: #6e645a; margin-bottom: 8px;">
              Vision, Aesthetic & Notes:
            </p>
            <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0; background: #ffffff; padding: 16px; border: 1px solid #ece5dc;">
              ${notes || 'No notes provided.'}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return NextResponse.json(
      { error: 'Internal delivery failure.' },
      { status: 500 }
    );
  }
}