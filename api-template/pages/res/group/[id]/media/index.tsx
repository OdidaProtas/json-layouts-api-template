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
import useResourceGroup from "../../../../../hooks/useResourceGroup";
import { usePagesStateValue } from "../../../../../lib/builder";
import { AuthSpinner } from "../../../../marketplace";
import ResDash from "../../../../../components/ResouceLayout";
import UploadImageDialog from "../../../../../components/UploadImageDialog";
import { useRouter } from "next/router";

const App: React.FC = () => {
  const resourceGroup = useResourceGroup();
  const loading = usePagesStateValue("loaders.resourceGroup");
  const router = useRouter();
  if (loading) return <AuthSpinner />;
  return (
    <ResDash isDetail>
      <Container sx={{ mb: 9 }}>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">
                {resourceGroup?.images?.length ?? 0} Media
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <UploadImageDialog resourceGroup={{ ...resourceGroup }} />
              </Box>
              <Box>
                <Button
                  onClick={router.back}
                  fullWidth
                  size="small"
                  sx={{ textTransform: "none", ml: 3 }}
                  variant="outlined"
                >
                  Go back
                </Button>
              </Box>
            </Box>
          </Box>
          {!Boolean(resourceGroup?.images?.length) && (
            <Typography sx={{ mt: 2 }}>No media added </Typography>
          )}

          <Grid container sx={{ mt: 3 }} spacing={3}>
            {resourceGroup?.images?.map((image) => {
              return (
                <Grid item xs={4} key={image.url}>
                  <Paper elevation={0} sx={{ p: 3 }}>
                    <img
                      style={{ maxHeight: 180 }}
                      width={"100%"}
                      src={image.url}
                      alt=""
                    />
                    <Button sx={{ my: 2 }} fullWidth variant="outlined">
                      Copy link
                    </Button>
                    <Button fullWidth variant="outlined">
                      Copy image JSON
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </ResDash>
  );
};

export default App;
