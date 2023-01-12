import * as React from "react";
import Badge from "@mui/material/Badge";
import useDetail from "../../../hooks/useRow";
import { Skeleton } from "@mui/material";

export default function SimpleBadge({
  api,
  badgeContent,
  icon = "shopping_basket",
}) {
  const [row, loadingRow] = useDetail(api);
  function getValues() {
    if (loadingRow) return { badgeContent, icon };
    if (row) {
      const rowData = JSON.parse(row?.rowDraft ?? "{}");
      const mapState = api?.mapState;
      return {
        badgeContent: rowData[mapState?.badgeContent],
        icon: rowData[mapState?.row],
      };
    }
    return { badgeContent, icon };
  }
  if (loadingRow) {
    return <Skeleton variant="rectangular" height={10} width={100} />;
  }
  const { badgeContent: muiBadgeContent, icon: muiBadgeIcon } = getValues();
  return (
    <Badge badgeContent={Number(muiBadgeContent ?? 0)} color="primary">
      <span className="material-icons md-48">{muiBadgeIcon}</span>
    </Badge>
  );
}
