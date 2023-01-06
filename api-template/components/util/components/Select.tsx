import React from "react";

import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import renderMenuItem from "../renderMenuItem";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { CircularProgress, LinearProgress } from "@mui/material";

export default function Select({
  options = [],
  label,
  handleChange,
  api,
}: any) {
  const [apiComponents, loading, error] = useTransformComponents(api);
  const items = React.useMemo(
    () =>
      [...options, ...(apiComponents ?? [])].map((option: any) =>
        renderMenuItem(option.label, option.value)
      ),
    [...options, apiComponents]
  );
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={handleChange}
      >
        {items}
      </MuiSelect>
      {loading && (
        <>
          <LinearProgress />
        </>
      )}
    </FormControl>
  );
}
