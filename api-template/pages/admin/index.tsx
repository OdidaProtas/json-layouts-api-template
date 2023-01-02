import { Container, Typography, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import Dash from "../../components/DashboardLayout";
import Button from "../../components/util/components/Button";
import useApps from "../../hooks/useApps";

export default function DashHome() {
  const router = useRouter();
  const apps = useApps();
  const numApps = apps?.length ?? 0;
  return (
    <Dash>
      <Container>
        <Typography variant="h4">Overview</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography>Apps</Typography>
              <Typography variant="h4" sx={{ my: 3 }}>
                {numApps}
              </Typography>
              <Button>View apps</Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>App Categories</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>Users</Paper>
          </Grid>
        </Grid>
      </Container>
    </Dash>
  );
}
