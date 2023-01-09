import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import renderComponents from "../renderComponents";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { LinearProgress } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({ components, spacing, api = {}, lg=6, md=6, xs=6 }) {
  const [apiComponents, loading] = useTransformComponents(api);
  components = [...components, ...(apiComponents ?? [])];
  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Grid container spacing={spacing}>
        {components.map((component, index) => {
          return (
            <Grid item xs={xs ?? true} md={md} lg={lg} key={index}>
              {renderComponents([component])}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
