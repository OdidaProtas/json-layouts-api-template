import React from "react";
import Layout from "../components/Layout";
import App from "../components/App";

import { useSession } from "next-auth/react";
import router from "next/router";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useApps from "../hooks/useApps";
import { usePagesStateValue } from "../lib/builder";
import { Typography } from "@mui/material";
import { Add, AppRegistration, Explore } from "@mui/icons-material";

const Apps: React.FC<any> = () => {
  const allApps = useApps();
  const apps = allApps?.filter((app) => app.published);
  const { data: session, status } = useSession();
  const loadingApps = usePagesStateValue("loaders.apps");
  if (status === "loading" || loadingApps) {
    return <AuthSpinner />;
  }
  const userHasValidSession = Boolean(session);

  return (
    <Layout>
      <div className="page">
        <main>
          <Container sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ my: 5 }}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box>
                    {Boolean(apps?.length) && (
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={apps.map((app) => ({
                          value: app.id,
                          label: app.name,
                        }))}
                        sx={{ width: 200 }}
                        onChange={(e, v) => {
                          if ((v as any)?.value)
                            router.push(`/${(v as any).value}`);
                        }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            placeholder="Search..."
                          />
                        )}
                      />
                    )}
                  </Box>

                  <Box>
                    {/* <CaategoryDialog appId={undefined} /> */}
                    <Button
                      // size="small"
                      disabled={!apps?.length}
                      onClick={() => router.push("/explore")}
                      sx={{ textTransform: "none", ml: 2 }}
                      disableElevation
                      variant="contained"
                      startIcon={<Explore />}
                    >
                      Discover Apps
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Grid
                sx={{ mb: 4, justifyContent: "center" }}
                container
                spacing={2}
              >
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    {apps.map((app) => (
                      <Grid key={app.id} item lg={2} md={6} xs={12}>
                        <div className="post">
                          <App noStatus app={app} />
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {!apps.length && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 300,
                    }}
                  >
                    <div>
                      <Typography variant="h4" sx={{ my: 3 }}>
                        There are no published apps
                      </Typography>
                      <Button
                        sx={{ textTransform: "none" }}
                        variant={"outlined"}
                        onClick={() => router.push("/create")}
                        startIcon={<Add />}
                      >
                        Create app
                      </Button>
                      <Button
                        startIcon={<AppRegistration />}
                        sx={{ ml: 2, textTransform: "none" }}
                        variant={"outlined"}
                        onClick={() => router.push("/m")}
                      >
                        My apps
                      </Button>
                    </div>
                  </div>
                )}
              </Grid>
            </Box>
          </Container>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          border-radius: 4px;
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

export default Apps;

export const AuthSpinner = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    </Box>
  );
};
