import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import prisma from "../../../../lib/prisma";
import { components } from "../../../../components/ComponentForm";
import Drafts from "@mui/icons-material/Drafts";

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
  const type = resource.type;
  const id = resource.id;
  const procedure = resource.procedure;

  if (type === "collection") {
    const table = await prisma.table.findUnique({
      where: {
        id: String(id),
      },
      include: {
        columns: {
          select: { key: true, id: true },
        },
        rows: {
          select: { rowDraft: true, id: true },
        },
      } as any,
    });

    const columns = table?.columns;
    const rows = table?.rows ?? [];

    if (procedure === "form") {
      const buttonText = resource.buttonText;
      const fields = resource?.fields ?? [];
      const requested =
        (columns as any)?.filter((col) => fields?.includes(col.key)) ?? [];

      const stockField = components["textfield"];
      const _components = requested.map((req) => {
        return {
          ...stockField,
          data: {
            label: req.key,
            type: "text",
            name: req.key,
          },
        };
      });

      const submitButton = {
        ...components["button"],
        data: {
          ...components["button"].data,
          text: buttonText,
          type: "submit",
        },
      };
      res.json([..._components, submitButton]);
    } else if (procedure === "options") {
      const labelKey = resource.labelKey;
      const valueKey = resource.valueKey;

      const options = ((rows as any) ?? []).map((row) => {
        const draft = JSON.parse(row.rowDraft ?? "{}");
        return {
          label: draft[labelKey],
          value: draft[valueKey],
          id: row.id,
        };
      });
      res.json(options);
    } else if (procedure === "table") {
      res.json({
        ...table,
        rows: (table.rows as any).map((r) => ({
          ...JSON.parse(r.rowDraft ?? "{}"),
          id: r.id,
        })),
      });
    } else if (procedure === "map") {
      const componentMapType = resource.mapType;
      const mapState = resource.mapState ?? {};
      const data = [
        ...((rows as any) ?? []).map((row) => {
          const rowData = JSON.parse(row.rowDraft ?? "{}");
          const typeKeys = Object.keys(
            components[componentMapType]?.data ?? {}
          );
          const newValues = typeKeys.reduce((prev, curr) => {
            return { ...prev, [curr]: rowData[curr] };
          }, {});
          const cps = Object.keys(mapState ?? {}).reduce((prev, curr) => {
            if (curr === "variant") {
              return { ...prev, curr: mapState["variant"] };
            }
            return { ...prev, [curr]: rowData[mapState[curr]] };
          }, {});
          return {
            ...components[componentMapType],
            data: { ...components[componentMapType]?.data, ...cps },
          };
        }),
      ];

      res.json(data);
    } else res.json([]);
  } else if (type === "media") {
    const app = await prisma.app.findUnique({
      where: {
        id: String(req.query?.slug),
      },
      include: {
        resourceGroups: {
          select: { name: true, id: true, images: true, tables: true },
        },
      } as any,
    });
    res.json(app);
  } else res.json([]);
}
