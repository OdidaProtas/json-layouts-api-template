import React from "react";
import Layout from "../components/Layout";
import App from "../components/App";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
import { Add, AppRegistration } from "@mui/icons-material";

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
          <Container sx={{ display: "flex", mb: 9 }}>
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
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: { xs: "none", lg: "block" },
                    }}
                  >
                    <Paper sx={{ p: 2, height: 400, overflow: "auto" }}>
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
                  <Grid item xs={12} lg={9}>
                    <Paper sx={{ width: "100%" }}>
                      <Carousel
                        showIndicators={false}
                        showStatus={false}
                        showArrows={false}
                        showThumbs={false}
                        autoPlay
                        interval={2000}
                        centerMode
                        centerSlidePercentage={80}
                      >
                        {apps.map((app, index) => {
                          return (
                            <div key={index}>
                              <img style={{ height: 400 }} src={app.image} />
                            </div>
                          );
                        })}
                      </Carousel>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", my: 12 }}>
                <Typography
                  sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}
                  variant="h5"
                >
                  All apps
                </Typography>
                <Box>
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={apps.map((app) => ({
                      value: app.id,
                      label: app.name,
                    }))}
                    sx={{ width: 300 }}
                    onChange={(e, v) => {
                      if ((v as any)?.value)
                        router.push(`/${(v as any).value}`);
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Search apps/categories..."
                      />
                    )}
                  />
                </Box>
              </Box>
              <Grid
                sx={{ mb: 4, justifyContent: "center" }}
                container
                spacing={2}
              >
                <Grid item xs={10} md={9} lg={8}>
                  <Grid container spacing={2}>
                    {apps.map((app) => (
                      <Grid key={app.id} item lg={3} md={6} xs={6}>
                        <Paper className="post">
                          <App noStatus app={app} />
                        </Paper>
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
                        My spaces
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
    <Layout>
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
    </Layout>
  );
};
