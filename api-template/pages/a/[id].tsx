import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";

import {
  Avatar,
  Box,
  Paper,
  Button,
  Container,
  Chip,
  CircularProgress,
  Stack,
  ThemeProvider,
  Grid,
  Alert,
  AlertTitle,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { AuthSpinner } from "..";
import useApp from "../../hooks/useApp";
import { usePagesStateValue } from "../../lib/builder";
import useApps, { useAppActions } from "../../hooks/useApps";
import { useAxios } from "../../hooks/useAxios";
import {
  AppSettingsAlt,
  ArtTrack,
  DomainVerification,
  FolderSpecial,
  OpenInNew,
  Pages,
  Preview as PreviewIcon,
} from "@mui/icons-material";
import defaultTheme from "../../lib/defaultheme";
import Preview from "../../components/Preview";

const App: React.FC<AppProps> = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const app = useApp();
  const apps = useApps();
  const props = app ?? {}; // to ref

  const loadingApps = usePagesStateValue("loaders.apps");

  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const { updateApps } = useAppActions();

  const axios = useAxios();
  async function publishPost(id: string): Promise<any> {
    try {
      setPublishing(true);
      const res = await axios.put(`/api/publish/${id}`);
      if (res.data) {
        let allApps = [...apps];
        let _app = allApps.find((appp) => appp.id === id);
        let indexOfApp = allApps.indexOf(_app);
        allApps[indexOfApp] = { ..._app, published: true };
        updateApps([...allApps]);
        setPublishing(false);

        await Router.push("/");
      } else setPublishing(false);
    } catch (e) {
      setPublishing(false);
    }
  }

  async function deletePost(id: string): Promise<void> {
    try {
      setPublishing(true);
      const res = await fetch(`/api/app/${id}`, {
        method: "DELETE",
      });
      if (res.json()) {
        setPublishing(false);
        await Router.push("/");
      } else setPublishing(false);
    } catch (e) {
      setPublishing(false);
    }
  }

  if (status === "loading" || loadingApps) {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>App</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  let title = props.name;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <Container sx={{ mb: 9 }}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={12} md={11} lg={7}>
              <Box sx={{ display: "flex", mt: 4 }}>
                <Box sx={{ flexGrow: 1, display: "flex" }}>
                  <Avatar src={props.image}>{title[0]}</Avatar>
                  <Typography variant="h5" sx={{ ml: 2, mt: 1 }}>
                    {title}
                  </Typography>
                  {/* <Chip
                    avatar={<Avatar alt="Natacha" src={session.user.image} />}
                    label={`Owner ${props?.author?.name || "Unknown author"}`}
                    variant="outlined"
                  /> */}
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PreviewIcon />}
                    sx={{ textTransform: "none", mr: 2, mt: 1 }}
                    onClick={() => Router.push(`/preview/${props.id}`)}
                  >
                    Full preview
                  </Button>
                </Box>
              </Box>
              <Stack sx={{ mt: 4 }} spacing={3}>
                <Paper
                  elevation={0}
                  sx={{ maxHeight: "40vh", overflow: "hidden", my: 2 }}
                >
                  <ThemeProvider theme={defaultTheme}>
                    <Preview />
                  </ThemeProvider>
                </Paper>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Description</Typography>
                  <ReactMarkdown>{props.description}</ReactMarkdown>
                </Paper>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Channels</Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Your app will only be available via the channels you select.
                    You can update channels in preferences.
                  </Typography>
                  <FormGroup>
                    <Stack spacing={3}>
                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              value={props.spaces}
                              size="small"
                            />
                          }
                          label="Spaces"
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              value={props.subdomain}
                              size="small"
                            />
                          }
                          label={
                            "Subdomain " +
                            `(https://${props?.appId}.dreamfeel.me)`
                          }
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              value={props.marketplace}
                              size="small"
                            />
                          }
                          label="Marketplace"
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              value={props.customDomain}
                              size="small"
                            />
                          }
                          label="Custom domain"
                        />
                      </Box>
                    </Stack>
                  </FormGroup>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none", mr: 2, my: 2 }}
                    className="button"
                    onClick={() => Router.push(`/preferences/${props.id}`)}
                    startIcon={<Pages />}
                  >
                    Update Channels in preferences{" "}
                    <OpenInNew sx={{ fontSize: 10 }} />
                  </Button>
                </Paper>

                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Templates</Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    DREAMFEEL SPACES beautiful, fully customizable templates
                    gives you simple to complex starting points for your
                    application. Browse a huge list of well crafted templates
                    and customize to your feel
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none", mr: 2, my: 2 }}
                    className="button"
                    onClick={() => Router.push(`/templates`)}
                    startIcon={<Pages />}
                  >
                    Choose a template
                  </Button>
                </Paper>

                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Editor</Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    DREAMFEEL SPACES code editor lets you customize your
                    application/template with finetune control of all components
                    and interactions
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none", mr: 2, my: 2 }}
                    className="button"
                    onClick={() => Router.push(`/builder/${props.id}`)}
                    startIcon={<ArtTrack />}
                  >
                    Customize Application
                  </Button>
                </Paper>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Resources</Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Upload media and create datatables to store data for your
                    application and use seamlessly in your components.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<FolderSpecial />}
                    sx={{ textTransform: "none", mr: 2 }}
                    className="button"
                    onClick={() => Router.push(`/res/${props.id}`)}
                  >
                    Resources
                  </Button>
                </Paper>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Preferences</Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Update app preferences, logo, favicon and channels.
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none", mr: 2 }}
                    className="button"
                    startIcon={<AppSettingsAlt />}
                    onClick={() => Router.push(`/preferences/${props.id}`)}
                  >
                    Settings
                  </Button>
                </Paper>

                <Paper elevation={0} sx={{ p: 2 }}>
                  <Typography variant="h3">Publish</Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Make your app available on your channels
                  </Typography>

                  <Button
                    fullWidth
                    startIcon={<DomainVerification />}
                    variant="outlined"
                    sx={{ textTransform: "none", mr: 2 }}
                    disabled={props.published || publishing}
                    className="button"
                    onClick={() => publishPost(props.id)}
                  >
                    {publishing ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Publish app"
                    )}
                  </Button>
                </Paper>
                <Button
                  disabled={deleting}
                  fullWidth
                  variant="contained"
                  disableElevation
                  color="error"
                  onClick={() => deletePost(props.id)}
                >
                  {deleting ? <CircularProgress size={20} /> : "Delete"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        .button {
          margin-left: 1rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default App;
