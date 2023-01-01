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
} from "@mui/material";
import CaategoryDialog from "../components/CategoryDialog";
import useApps from "../hooks/useApps";

const Apps: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const apps = useApps();
  if (status === "loading") {
    return <AuthSpinner />;
  }
  const userHasValidSession = Boolean(session);

  return (
    <Layout>
      <div className="page">
        <main>
          <Container sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ my: 1 }} variant="h5">
                    Featured apps
                  </Typography>
                </Box>
                <Box sx={{ display: "lex" }}>
                  <CaategoryDialog appId={undefined} />
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
                    <Typography>Categories</Typography>
                  </Grid>
                  <Grid item xs>
                    <Box sx={{ width: "100%" }}>
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
                                style={{ borderRadius: "4px" }}
                                src={app.image}
                              />
                            </div>
                          );
                        })}
                      </Carousel>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ my: 2 }} variant="h5">
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
                  <div>
                    <h6>There are 0 published apps</h6>
                    <button onClick={() => router.push("/create")}>
                      Create app
                    </button>
                    <button onClick={() => router.push("/drafts")}>
                      Go to drafts
                    </button>
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
