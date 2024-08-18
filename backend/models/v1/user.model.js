import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  lastLogin: {
    type: Date,
    default: Date.now,
    require: true
  },
  role: {
    type: String,
    default: "user",
    require: false
  },
  avatar: {
    type: String,
    default: "",
    require: false
  },
  status: {
    type: String,
    default: "active",
    require: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    require: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  resetPasswordTokenUsed: Boolean,

  verificationExpiresAt: Date,
  verificationTokenCreated: Date,
  verificationTokenUsed: Boolean,
  verificationTokenUsedAt: Date,
  verificationTokenFailedAttempts: Number,
  verificationTokenFailedAttemptsReset: Date,
  verificationTokenFailedAttemptsResetAt: Date,

  twoFactorAuthSecret: String,
  twoFactorAuthEnabled: Boolean,
  twoFactorAuthLastUsed: Date,
  twoFactorAuthLastFailed: Date,
  twoFactorAuthFailedAttempts: Number,
  twoFactorAuthBlockedUntil: Date,
  twoFactorAuthBlocked: Boolean,
  twoFactorAuthBlockedReason: String,
  verificationToken: String,

}, {timestamps: true})

export const User = mongoose.model('User', userSchema)