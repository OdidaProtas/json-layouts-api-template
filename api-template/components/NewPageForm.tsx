import helloWorld from "../lib/defaultApp";
import { Box, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import renderPage from "./util/renderPage";
import { usePagesStateValue } from "../lib/builder";
export default function NewPageForm() {
  const templates = [helloWorld];
  const { addPage } = useActions();
  const theme = usePagesStateValue("theme");
  return (
    <Box>
      <Box sx={{ p: 8, bgcolor: "lightblue", borderRadius: "4px" }}>
        <Typography sx={{ my: 4 }} variant="h3">
          Templates
        </Typography>
        <Grid container spacing={2}>
          {templates.map((template, index) => {
            return (
              <Grid item key={index} xs={4}>
                <ThemeProvider theme={theme}>
                  <Paper
                    onClick={() => addPage(template)}
                    sx={{
                      p: 2,
                      maxWidth: "100%",
                      border: "1px solid gray",
                      cursor: "poiner",
                    }}
                  >
                    {renderPage(template)}
                  </Paper>
                </ThemeProvider>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");
  const pages = usePagesStateValue("pages");
  return {
    addPage(template) {
      const type = "update_all";
      const key = "pages";
      const payload = [...pages, { ...template }];
      dispatch({ key, type, payload });
    },
  };
}
