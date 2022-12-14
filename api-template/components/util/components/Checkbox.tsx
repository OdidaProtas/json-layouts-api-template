import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

export default function Checkbox({
  defaultChecked = false,
  label = "Checkbox",
}) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<MuiCheckbox defaultChecked={defaultChecked} />}
        label={label}
      />
    </FormGroup>
  );
}
