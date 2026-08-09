import express from "express";
import { create } from "../controller/transaction.controller.js";

const router = express.Router();

router.post("/", create);

export default router;
