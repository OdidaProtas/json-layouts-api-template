import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import useResourceGroup from "../../../../hooks/useResourceGroup";
import { usePagesStateValue } from "../../../../lib/builder";
import { AuthSpinner } from "../../..";
import ResDash from "../../../../components/ResouceLayout";
import UploadImageDialog from "../../../../components/UploadImageDialog";
import { useRouter } from "next/router";
import DatatableFormDialog from "../../../../components/DatatableFormDialog";
import ResourceTabs from "../../../../components/ResourceTabs";

const App: React.FC = () => {
  const props = useResourceGroup();

  const loading = usePagesStateValue("loaders.resourceGroup");
  const router = useRouter();
  if (loading) return <AuthSpinner />;
  return (
    <ResDash isDetail>
      <Container sx={{ mb: 9 }}>
        <Grid container>
          <Grid item md={11} xs={12} lg={8}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4">Resources</Typography>
                </Box>
                <Box>
                  <Button
                    onClick={router.back}
                    fullWidth
                    size="small"
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                  >
                    Go back
                  </Button>
                </Box>
              </Box>
              <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4">Media</Typography>
                    </Box>
                    <Box>
                      <UploadImageDialog resourceGroup={{ ...props }} />
                    </Box>
                  </Box>
                  <Typography>
                    Images / Videos / Documents uploaded for use by components
                    on the application
                  </Typography>
                  <Typography variant="h3">
                    {props?.images?.length ?? 0} Items
                  </Typography>
                  <Button
                    onClick={() =>
                      router.push(`/res/group/${router.query.id}/media`)
                    }
                    fullWidth
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                  >
                    View media
                  </Button>
                </Stack>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4">Collections</Typography>
                    </Box>
                    <Box>
                      <DatatableFormDialog resourceGroup={{ ...props }} />
                    </Box>
                  </Box>
                  <Typography>Your backend in a snap</Typography>
                  <Typography variant="h3">
                    {props?.tables?.length ?? 0} Items
                  </Typography>
                  <Button
                    onClick={() =>
                      router.push(`/res/group/${router.query.id}/collections`)
                    }
                    fullWidth
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                  >
                    View Collections
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
        {/* <ResourceTabs resourceGroup={{ ...props }} /> */}
      </Container>
    </ResDash>
  );
};

export default App;
