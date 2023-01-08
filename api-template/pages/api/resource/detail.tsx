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
  const resource = req.body;
  const itemId = resource.itemId;

  const app = await prisma.row.findUnique({
    where: {
      id: String(itemId),
    },
  });
  res.json(app);
}
