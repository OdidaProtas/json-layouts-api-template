import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "../../../../lib/prisma";

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
  const app = await prisma.table.findMany({
    include: {
      columns: {
        select: { key: true, id: true },
      },
      rows: {
        select: { id: true, rowDraft: true },
      },
    } as any,
  });

  const parsedRows = app.map((a) => ({
    ...a,
    rows: ((a?.rows as any) ?? [])?.map((r) => JSON.parse(r.rowDraft ?? "")),
  }));

  console.log(parsedRows)

  res.json(parsedRows);
}
