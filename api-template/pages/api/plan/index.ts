import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, image , price, currency} = req.body;
  const result = await prisma.plan.create({
    data: {
      name,
      description,
      image,
      price,
      currency
    },
  });
  res.json(result);
}
