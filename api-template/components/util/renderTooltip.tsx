import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useDetail from "../../hooks/useRow";

export default function renderTooltip({ api }) {
  return (
    <>
      <BasicTooltip api={api} />
    </>
  );
}

function BasicTooltip({ api }) {
  const [row, loadingRow] = useDetail(api);
  return (
    <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
