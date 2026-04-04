import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { connectMongo } from '@/lib/mongodb';
import { OtpModel } from '@/models/otpmodel';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email' },
        { status: 400 }
      );
    }

    await connectMongo();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const { error } = await resend.emails.send({
      from: 'Zibmate <no-reply@zibmate.com>',
      to: email,
      subject: 'Your OTP for Email Verification',
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #ea580c;">Verify your email</h2>
          <p style="color: #444;">Your OTP for email Verification is:</p>
          <h1 style="letter-spacing: 12px; color: #111; font-size: 36px;">${otp}</h1>
          <p style="color: #888; font-size: 13px;">
            This OTP expires in <b>5 minutes</b>. Do not share it with anyone.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send OTP' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'OTP sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}