import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useDetail from "../../hooks/useRow";

function BasicAlerts({ api }) {
  const [row, loadingRow] = useDetail(api);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  );
}

export default function renderAlert({ api }) {
  return <BasicAlerts api={api} />;
}
