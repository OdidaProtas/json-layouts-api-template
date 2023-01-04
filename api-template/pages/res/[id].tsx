import React from "react";
import Layout from "../../components/Layout";
import { Container, Grid, Box, Typography, Chip } from "@mui/material";
import { useRouter } from "next/router";
import CreateResourceGroupDialog from "../../components/CreateResourceGroupDialog";
import useResourceGroups from "../../hooks/useResourceGroups";
import { usePagesStateValue } from "../../lib/builder";
import { AuthSpinner } from "..";
import ResDash from "../../components/ResouceLayout";

const App: React.FC<any> = () => {
  const groups = useResourceGroups();
  const router = useRouter();
  const loading = usePagesStateValue("loaders.resourceGroups");
  if (loading) return <AuthSpinner />;
  return (
    <ResDash>
      <Container className="page">
        <Box sx={{ display: "flex" }}>
          <h1 style={{ flexGrow: 1 }}>Resource Groups</h1>
          {Boolean(groups?.length) && (
            <div>
              <CreateResourceGroupDialog resourceGroups={groups} />
            </div>
          )}
        </Box>

        <Container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid spacing={2} container>
                {groups?.map((app) => (
                  <Grid
                    onClick={() => router.push(`/res/group/${app.id}`)}
                    item
                    lg={4}
                    md={6}
                    xs={12}
                    sx={{ py: 3 }}
                    key={app.id}
                  >
                    <div className="post">
                      {app.isNew && <Chip color="primary" label="New" />}
                      <Typography variant="h5">{app.name}</Typography>
                      <Typography variant="caption"> {app.tag}</Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
              {!Boolean(groups?.length) && (
                <div>
                  <Typography sx={{ my: 4 }} variant="h4">
                    You do not have resource groups
                  </Typography>
                  <CreateResourceGroupDialog resourceGroups={groups} />
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </Container>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
          padding: 9px;
          border-radius: 4px;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </ResDash>
  );
};

export default App;
