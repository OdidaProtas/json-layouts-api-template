import { Paper, Typography, Box, Grid } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Paper sx={{ p: 2, my: 9 }} elevation={0}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Top 3 DREAMFEEL SPACES FEATURES</Typography>
        </Box>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6">Fully managed web apps</Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            facilis porro velit enim eveniet consequuntur quos cum, ullam at
            doloremque non odio earum dolorum fuga aliquam reprehenderit
            recusandae reiciendis. Fuga.
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Collections API</Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            facilis porro velit enim eveniet consequuntur quos cum, ullam at
            doloremque non odio earum dolorum fuga aliquam reprehenderit
            recusandae reiciendis. Fuga.
          </Grid>
          <Grid item xs>
            <Typography variant="h6">
              Top 3 DREAMFEEL SPACES FEATURES
            </Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            facilis porro velit enim eveniet consequuntur quos cum, ullam at
            doloremque non odio earum dolorum fuga aliquam reprehenderit
            recusandae reiciendis. Fuga.
          </Grid>
        </Grid>
      </Paper>{" "}
      <Paper sx={{ p: 2, my: 9 }} elevation={0}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">SPACES PLANS FOR EVERYONE</Typography>
        </Box>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6">Fully managed web apps</Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            facilis porro velit enim eveniet consequuntur quos cum, ullam at
            doloremque non odio earum dolorum fuga aliquam reprehenderit
            recusandae reiciendis. Fuga.
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Collections API</Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            facilis porro velit enim eveniet consequuntur quos cum, ullam at
            doloremque non odio earum dolorum fuga aliquam reprehenderit
            recusandae reiciendis. Fuga.
          </Grid>
          <Grid item xs>
            <Typography variant="h6">
              Top 3 DREAMFEEL SPACES FEATURES
            </Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            facilis porro velit enim eveniet consequuntur quos cum, ullam at
            doloremque non odio earum dolorum fuga aliquam reprehenderit
            recusandae reiciendis. Fuga.
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
