import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useDetail from "../../../hooks/useRow";

export default function BasicChips({ api }) {
  const [row, loadingRow] = useDetail(api);
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Chip Filled" />
    </Stack>
  );
}
