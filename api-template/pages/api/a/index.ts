import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "../../../lib/prisma";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const apps = await prisma.app.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true, image:true },
      },
    },
  });
  res.json(apps);
}
