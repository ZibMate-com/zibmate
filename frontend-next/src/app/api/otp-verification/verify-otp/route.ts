import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import { OtpModel } from '@/models/otpmodel';


export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    await connectMongo();

    const stored = await OtpModel.findOne({ email });

    if (!stored) {
      return NextResponse.json(
        { success: false, message: 'OTP expired or not found. Please request a new one' },
        { status: 404 }
      );
    }

    if (stored.otp !== otp) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 401 }
      );
    }

    
    await OtpModel.deleteOne({ email });

    return NextResponse.json(
      { success: true, message: 'Email verified successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}