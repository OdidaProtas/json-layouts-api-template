import { useRouter } from "next/router";
import useApps from "../../hooks/useApps";
import Dash from "../../components/DashboardLayout";
import useCategories from "../../hooks/useCategories";
import { usePagesStateValue } from "../../lib/builder";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Box,
} from "@mui/material";
import useProfiles from "../../hooks/useProfiles";
import usePlans from "../../hooks/usePlans";

export default function DashHome() {
  const apps = useApps();
  const plans = usePlans();
  const router = useRouter();
  const profiles = useProfiles();
  const categories = useCategories();

  const {
    apps: loadingApps,
    categories: loadingCategories,
    profiles: loadingProfiles,
    plans: loadingPlans,
  } = usePagesStateValue("loaders", {
    apps: false,
    categories: false,
    profiles: false,
    plans: false,
  });
  const numApps = apps?.length ?? 0;
  const numCategories = categories?.length ?? 0;
  const numProfiles = profiles?.length ?? 0;
  const numPlans = plans?.length ?? 0;

  return (
    <Dash>
      <Container>
        <Typography variant="h4">Overview</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography>Apps</Typography>
              <Typography variant="h3" sx={{ my: 3 }}>
                {numApps}
              </Typography>
              <Stack spacing={2} direction={"row"}>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/apps")}
                  >
                    View
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/apps/create")}
                  >
                    Add
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    disabled
                  >
                    Import
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    disabled
                  >
                    Export
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography>Categories</Typography>
              <Typography variant="h3" sx={{ my: 3 }}>
                {numCategories}
              </Typography>
              <Stack spacing={2} direction={"row"}>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/categories")}
                  >
                    View
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/categories/create")}
                  >
                    Add
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    disabled
                  >
                    Import
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    disabled
                  >
                    Export
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography>Users</Typography>
              <Typography variant="h3" sx={{ my: 3 }}>
                {numProfiles}
              </Typography>
              <Stack spacing={2} direction={"row"}>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/users")}
                  >
                    View
                  </Button>
                </Box>

                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    disabled
                  >
                    Import
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    disabled
                    variant="outlined"
                  >
                    Export
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography>Plans</Typography>
              <Typography variant="h3" sx={{ my: 3 }}>
                {numPlans}
              </Typography>
              <Stack spacing={2} direction={"row"}>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/plans/create")}
                  >
                    Add
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    onClick={() => router.push("/admin/plans")}
                  >
                    View
                  </Button>
                </Box>

                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    variant="outlined"
                    disabled
                  >
                    Import
                  </Button>
                </Box>
                <Box>
                  <Button
                    size="small"
                    sx={{ textTransform: "none" }}
                    fullWidth
                    disabled
                    variant="outlined"
                  >
                    Export
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Dash>
  );
}
