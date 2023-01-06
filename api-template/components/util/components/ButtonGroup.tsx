import * as React from "react";
import Button from "@mui/material/Button";
import MUIButtonGroup from "@mui/material/ButtonGroup";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { CircularProgress } from "@mui/material";

export default function ButtonGroup({ options = [], api = {} }) {
  const [apiComponents, loading, error] = useTransformComponents(api);
  options = [...options, ...(apiComponents ?? [])];
  return (
    <>
      <MUIButtonGroup
        disabled={loading}
        variant="contained"
        aria-label="outlined primary button group"
      >
        {loading && <CircularProgress size={20} />}
        {options.map((option) => {
          return <Button key={option.value}>{option.value}</Button>;
        })}
      </MUIButtonGroup>
    </>
  );
}
