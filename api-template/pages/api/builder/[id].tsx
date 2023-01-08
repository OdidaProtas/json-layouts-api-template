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
  const app = await prisma.app.findUnique({
    where: {
      id: String(req.query?.id),
    },
    include: {
      resourceGroups: {
        select: {
          name: true,
          id: true,
          images: true,
          tables: { select: { id: true, columns: true, rows: true, name:true } },
        },
      },
    } as any,
  });

  const response =
    (app?.resourceGroups as unknown as any)?.map((resource) => ({
      images: resource.images,
      tables: resource.tables,
    })) ?? [];

  const responseFormat = response.reduce(
    (prev, curr) => {
      return {
        ...prev,
        images: [...prev.images, ...curr.images],
        tables: [...prev.tables, ...curr.tables],
      };
    },
    { images: [], tables: [] }
  );

  res.json(responseFormat);
}
