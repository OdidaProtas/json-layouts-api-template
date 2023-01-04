import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useTables from "../../../hooks/useTables";
import { Box, Button, Container, Typography } from "@mui/material";
import ResDash from "../../../components/ResouceLayout";
import { useRouter } from "next/router";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [];

export default function DenseTable() {
  const table = useTables() ?? { name: "Unknown table", columns: [] };
  const router = useRouter();
  return (
    <ResDash>
      <Container>
        <Box sx={{ display: "flex", my: 6 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">Table: {table.name}</Typography>
          </Box>
          <Box>
            <Button onClick={router.back} variant="outlined">
              Go Back
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {table.columns.map((col, index) => {
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
              {!Boolean(rows.length) && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    colSpan={table.columns.length}
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
    </ResDash>
  );
}
