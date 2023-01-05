import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
  const { tableId, rowDraft } = req.body;
  const result = await prisma.row.create({
    data: {
      tableId,
      rowDraft: String(rowDraft),
    },
  });
  res.json(result);
}
