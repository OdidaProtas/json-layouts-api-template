import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
} from "@mui/material";
import React from "react";
import { components, ComponentSelect } from "../ComponentForm";

export default function ComponentsAPI({
  handleMapTypeChange,
  componentMapType,
  mapComponentDataKeys,
  mapState,
  handleMapChange,
  mapKeys,
}) {
  const variants = {
    button: ["outlined", "contained"],
    text: ["h1", "h2", "h3", "h4", "h5", "h6", "body1", "body2", "caption"],
  };

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>Select component to map to</Typography>
      <ComponentSelect
        onChange={handleMapTypeChange}
        value={componentMapType}
      />
      {mapComponentDataKeys.map((key, index) => {
        return (
          <Grid sx={{ mt: 2 }} container key={index}>
            <Grid item xs>
              <Typography>{key}</Typography>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Field</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mapState[key]}
                  label="Field"
                  name={key}
                  onChange={handleMapChange}
                >
                  {(key === "variant"
                    ? variants[componentMapType] ?? []
                    : mapKeys
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
