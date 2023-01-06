import * as React from "react";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { Box, CircularProgress, LinearProgress } from "@mui/material";

export default function Autocomplete({
  options = [],
  label = "Choose wisely",
  api = {},
}) {
  const [apiComponents, loading, error] = useTransformComponents(api);
  options = [...options, ...(apiComponents ?? [])];
  return (
    <>
      <MuiAutocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      <Box>{loading && <LinearProgress />}</Box>
    </>
  );
}
