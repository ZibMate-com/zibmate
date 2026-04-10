import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const OtpModel = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);
