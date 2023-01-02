import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, image } = req.body;
  const result = await prisma.appCategory.create({
    data: {
      name,
      description,
      image,
    },
  });
  res.json(result);
}
