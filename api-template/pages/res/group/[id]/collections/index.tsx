import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import useResourceGroup from "../../../../../hooks/useResourceGroup";
import { usePagesStateValue } from "../../../../../lib/builder";
import { AuthSpinner } from "../../../../marketplace";
import ResDash from "../../../../../components/ResouceLayout";
import { useRouter } from "next/router";
import DatatableFormDialog from "../../../../../components/DatatableFormDialog";
import ExportDialog from "../../../../../components/Export";
import ImportDialog from "../../../../../components/Import";

const App: React.FC = () => {
  const resourceGroup = useResourceGroup();
  const loading = usePagesStateValue("loaders.resourceGroup");
  const router = useRouter();
  if (loading) return <AuthSpinner />;
  return (
    <ResDash isDetail>
      <Container sx={{ mb: 9 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">Collections</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box>
              <DatatableFormDialog resourceGroup={{ ...resourceGroup }} />
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
        {!Boolean(resourceGroup?.tables?.length) && (
          <Typography sx={{ mt: 2 }}>No collections added </Typography>
        )}
        <Grid container sx={{ mt: 3 }} spacing={3}>
          {resourceGroup?.tables?.map((table) => {
            const columns = table.columns;
            return (
              <Grid item xs={5} key={table?.id}>
                <Paper elevation={0} sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography>{table.name}</Typography>
                    <Divider />
                    <Typography>Fields</Typography>
                    <ul>
                      {columns.map((column, index) => {
                        return <li key={index}>{column.key}</li>;
                      })}
                    </ul>
                    <Stack spacing={2} direction={"row"}>
                      <Box>
                        <Button
                          size="small"
                          onClick={() =>
                            router.push(`/res/table/${table.id}/create`)
                          }
                          sx={{ textTransform: "none" }}
                          variant="outlined"
                        >
                          Add record
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          onClick={() => router.push(`/res/table/${table.id}`)}
                          sx={{ textTransform: "none" }}
                          variant="outlined"
                        >
                          View records
                        </Button>
                      </Box>
                      <Box>
                        <ExportDialog resourceGroup={{}} />
                      </Box>
                      <Box>
                        <ImportDialog resourceGroup={{}} />
                      </Box>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ResDash>
  );
};

export default App;
