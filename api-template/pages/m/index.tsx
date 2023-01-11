import React from "react";
import { useSession } from "next-auth/react";
import { Box, Grid, Container, Button, Typography } from "@mui/material";
import router from "next/router";
import { AuthSpinner } from "..";
import Layout from "../../components/Layout";
import App from "../../components/App";
import useApps from "../../hooks/useApps";

const Index: React.FC = () => {
  const { data: session, status } = useSession();

  const allApps = useApps();

  const apps = allApps.filter(
    (app) => app.author.email === session?.user?.email
  );
  const hasApps = Boolean(apps.length);

  if (status === "loading") {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>Apps</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <Container sx={{ mb: 9 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ mt: 3 }} variant="h3">
                My spaces
              </Typography>
              <Grid
                sx={{ mt: 2, justifyContent: "center" }}
                spacing={2}
                container
              >
                <Grid item xs={12} md={10} lg={8}>
                  <Grid container spacing={2}>
                    {apps.map((app) => (
                      <Grid item lg={3} md={4} xs={6} key={app.id}>
                        <div className="post">
                          <App app={app} />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              {!hasApps && (
                <Box
                  sx={{
                    minHeight: "70vh",
                    display: "flex",
                    justifyContent: "Center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h3">
                      You do not have any applications
                    </Typography>
                    <Button
                      sx={{ mt: 2 }}
                      fullWidth
                      variant={"outlined"}
                      onClick={() => router.push("/create")}
                    >
                      Create app
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Index;
