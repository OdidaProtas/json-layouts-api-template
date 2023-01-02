import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import App, { AppProps } from "../components/App";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Grid,
  Box,
  Container,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CaategoryDialog from "../components/CategoryDialog";
import useApps from "../hooks/useApps";
import useCategories from "../hooks/useCategories";

const Apps: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const apps = useApps();

  const userHasValidSession = Boolean(session);

  const categories = useCategories();
  if (status === "loading") {
    return <AuthSpinner />;
  }
  return (
    <Layout>
      <div className="page">
        <main>
          <Container sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ my: 3 }} variant="h5">
                    Featured apps
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box>
                    <CaategoryDialog appId={undefined} />
                  </Box>
                  {/* <Autocomplete
                    size="small"
                    sx={{ width: 100, ml: 3 }}
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={props.apps.map((app) => ({
                      value: app.id,
                      label: app.name,
                    }))}
                    onChange={(e, v) => {
                      if ((v as any)?.value)
                        router.push(`/${(v as any).value}`);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} placeholder="Search apps" />
                    )}
                  /> */}
                </Box>
              </Box>
              <Box sx={{ my: 1 }}>
                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, mt: 3, height: 400, overflow: "auto" }}>
                      <Typography>Categories</Typography>
                      <Divider sx={{ my: 2 }} />
                      <List dense>
                        {" "}
                        {categories.map((cat) => {
                          return (
                            <ListItem key={cat.id}>
                              <ListItemButton>
                                <ListItemText primary={cat.name}></ListItemText>
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper sx={{ width: "100%" }}>
                      <Carousel
                        showIndicators={false}
                        showStatus={false}
                        showArrows={false}
                        showThumbs={false}
                        autoPlay
                      >
                        {apps.map((app, index) => {
                          return (
                            <div key={index}>
                              <img
                                style={{ borderRadius: "4px", height: 400 }}
                                src={app.image}
                              />
                            </div>
                          );
                        })}
                      </Carousel>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Typography sx={{ my: 9 }} variant="h5">
                  All apps
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <>
                  {apps.map((app) => (
                    <Grid key={app.id} item lg={3} md={6} xs={12}>
                      <div className="post">
                        <App app={app} />
                      </div>
                    </Grid>
                  ))}
                </>

                {!apps.length && userHasValidSession && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 300,
                    }}
                  >
                    <div>
                      <h6>There are no published apps</h6>
                      <button onClick={() => router.push("/create")}>
                        Create app
                      </button>
                      <button onClick={() => router.push("/drafts")}>
                        Go to drafts
                      </button>
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
