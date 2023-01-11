import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
  const { tableId, rowDraft, id } = req.body;
  if (req.method === "POST") {
    const result = await prisma.row.create({
      data: {
        tableId,
        rowDraft: String(rowDraft),
      },
    });
    res.json(result);
  }
  if (req.method === "PUT") {
    const result = await prisma.row.update({
      where: { id },
      data: {
        rowDraft: String(rowDraft),
      },
    });
    res.json(result);
  }
}
