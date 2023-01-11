import { Paper, Typography, Box, Grid, Divider, Skeleton } from "@mui/material";
import usePlans from "../hooks/usePlans";
import ReactMarkdown from "react-markdown";
import { usePagesStateValue } from "../lib/builder";

export default function Footer() {
  const plans = usePlans() ?? [];
  const loadingPlans = usePagesStateValue("loaders.plans");
  if (loadingPlans) {
    return (
      <Grid sx={{ my: 3 }} spacing={3} container>
        {[1, 3, 4, 5].map((plan, index) => {
          return (
            <Grid key={index} item xs={3}>
              <Skeleton height={91} variant="rectangular" />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  return (
    <>
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h4">SPACES FEATURES</Typography>
      </Box>
      <Grid spacing={3} sx={{ my: 4 }} container>
        <Grid item xs>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 1 }} variant="h5">
              Native features
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Tap into native platform API's.</Typography>
          </Paper>{" "}
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 1 }} variant="h5">
              Collections aAPI
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Tap into the power of a full backend.</Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ mb: 1 }} variant="h5">
              Multiple channels
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>
              Multiple ways for your space to be discovered.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h4">SPACES FOR EVERYONE</Typography>
      </Box>
      <Grid sx={{ my: 3, mb: 12 }} spacing={3} container>
        {plans.map((plan) => {
          return (
            <Grid key={plan.id} item xs={3}>
              <Paper sx={{ p: 2, my: 3, height: "100%" }}>
                <Typography variant="h4">{plan?.name}</Typography>
                <Divider sx={{ my: 2 }} />
                <ReactMarkdown>{plan?.description}</ReactMarkdown>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
