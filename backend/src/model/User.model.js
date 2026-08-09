import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    pass: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
    },
    month: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("pass")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
  } catch (e) {
    throw e;
  }
});

export const User = mongoose.model("User", userSchema);
