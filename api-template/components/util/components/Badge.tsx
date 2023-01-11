import * as React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import useDetail from "../../../hooks/useRow";
import { Skeleton } from "@mui/material";

export default function SimpleBadge({ api, badgeContent }) {
  const [row, loadingRow] = useDetail(api);
  function getValues() {
    if (loadingRow) return { badgeContent };
    if (row) {
      const rowData = JSON.parse(row?.rowDraft ?? "{}");
      const mapState = api?.mapState;
      return { badgeContent: rowData[mapState?.badgeContent] };
    }
    return { badgeContent };
  }
  if (loadingRow) {
    return <Skeleton variant="rectangular" height={10} width={100} />;
  }
  const { badgeContent: content } = getValues();
  return (
    <Badge badgeContent={Number(content)} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
