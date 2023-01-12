import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useDetail from "../../../hooks/useRow";
import { Skeleton } from "@mui/material";

export default function BasicChips({ api, label = "Chip" }) {
  const [row, loadingRow] = useDetail(api);

  function getValue() {
    if (api?.id) {
      if (loadingRow) {
        return { label: "" };
      }
      if (row) {
        const mapState = api?.mapState;
        const rowData = JSON.parse(row?.rowDraft ?? "{}");
        return { label: rowData[mapState?.label] };
      }
      return { label };
    }
    return { label };
  }

  if (api?.id && loadingRow) {
    return <Skeleton />;
  }

  const { label: chipLabel } = getValue();

  return <Chip label={chipLabel} />;
}
