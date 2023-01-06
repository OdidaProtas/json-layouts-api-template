import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { LinearProgress } from "@mui/material";

export default function RadioButtonsGroup({
  options = [],
  label = "Radio button group",
  api = {},
}) {
  const [apiComponents = [], loading, error] = useTransformComponents(api);
  options = [...options, ...(apiComponents??[])];
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {options.map((option) => {
          return (
            <FormControlLabel
              value="female"
              key={option.value}
              control={<Radio />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
      {loading && (
        <>
          <LinearProgress />
        </>
      )}
    </FormControl>
  );
}
