import prisma from "../../../../../lib/prisma";

export default async function handle(req, res) {
  const { name, description, resourceGroupId, fields = [] } = req.body;
  const table = await prisma.table.create({
    data: {
      name,
      description,
      resourceGroupId,
    },
  });
  let columns = [];
  for (let field of fields) {
    const { key, type } = field;
    const column = await prisma.column.create({
      data: {
        key,
        type,
        tableId: table.id,
      },
    });
    columns.push(column);
  }
  res.json({ ...table, columns });
}
