import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useTables from "../../../hooks/useTables";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import ResDash from "../../../components/ResouceLayout";
import { useRouter } from "next/router";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { useSocketEvent } from "../../../lib/socket";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

export default function DenseTable({ api }) {
  const [table = { columns: [], rows: [], id: "" }, loadingTables, error] =
    useTransformComponents(api);

  const [socketData, setSockeData] = React.useState([]);

  const router = useRouter();
  const rows =
    [...socketData, ...(table?.rows ?? [])].map((row) => {
      return table?.columns.map((col) => row[col.key]);
    }) ?? [];

  useSocketEvent("add_to_collection", (data) => {
    if (data?.id === api?.id) {
      setSockeData((p) => {
        let prev = [...p];
        prev.unshift({ ...data.row, isNew: true });
        return prev;
      });
    }
  });

  return (
    <Container>
      <Box sx={{ display: "flex", my: 6 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">Table: {table?.name}</Typography>
        </Box>
        {loadingTables && <LinearProgress />}
        <Box>
          <Button
            sx={{ mr: 2 }}
            size="small"
            onClick={() => router.push(`/res/table/${router.query.id}/create`)}
            variant="outlined"
            disabled
          >
            Add
          </Button>
          <Button size="small" onClick={router.back} variant="outlined">
            Go Back
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 259 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ bgcolor: "lightgray" }}>
              {table?.columns?.map((col, index) => {
                return (
                  <TableCell
                    align={index === 0 ? "left" : "right"}
                    sx={{ fontWeight: "bold" }}
                    key={index}
                  >
                    {col.key}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((rowItems, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {rowItems.map((item, ind) => {
                  return (
                    <TableCell
                      align={ind === 0 ? "left" : "right"}
                      key={ind}
                      component="th"
                      scope="row"
                    >
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {!Boolean(rows.length) && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  colSpan={table?.columns?.length}
                  component="th"
                  scope="row"
                >
                  No data has been added to this resource
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
