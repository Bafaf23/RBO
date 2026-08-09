import mongoose from "mongoose";

const transactionShema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "La descripción o título es obligatorio"],
      trim: true,
    },
    amountUsd: {
      type: Number,
      required: [true, "El monto en USD es obligatorio"],
      min: [0.01, "El monto debe ser mayor a 0"],
    },
    type: {
      type: String,
      enum: ["ingreso", "egreso"],
      required: true,
    },
    category: {
      type: String,
      default: "necesidades",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model("Transaction", transactionShema);
