import * as React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import useDetail from "../../../hooks/useRow";

export default function SimpleBadge({ api }) {
  const [row, loadingRow] = useDetail(api);
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
