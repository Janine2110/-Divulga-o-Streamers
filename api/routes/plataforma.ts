import express from "express";
import { Plataforms } from "@prisma/client";

const router = express.Router();

router.get("/", (req, res) => {
  const plataformas = Object.values(Plataforms);
  res.json(plataformas);
});

export default router;
