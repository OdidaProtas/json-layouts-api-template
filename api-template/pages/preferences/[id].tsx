import React from "react";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";

import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  CircularProgress,
  LinearProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ImageField from "../../components/ImageField";
import useUpload from "../../hooks/useUpload";
import { AuthSpinner } from "..";
import useApp from "../../hooks/useApp";
import { usePagesStateValue } from "../../lib/builder";
import useIsUniqueAppId from "../../hooks/useIsUniqueAppId";
import useCategories from "../../hooks/useCategories";
import useToast from "../../hooks/useToast";
import axios from "axios";

const App: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const app = useApp();
  const categories = useCategories() ?? [];
  const props = app ?? { name: "" }; // to ref
  const loadingApp = usePagesStateValue("loaders.apps");
  const loadingCategories = usePagesStateValue("loaders.categories");
  const [state, setState] = React.useState(() => props);
  const [saving, setSaving] = React.useState(false);

  const [image, setImage] = React.useState("");

  const handleLogoChange = React.useCallback((data) => {
    setImage(data[0]);
  }, []);

  let title = props?.name;
  if (!props?.published) {
    title = `${title} (Draft)`;
  }

  const handleChange = (e) =>
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));

  const uploadImages = useUpload();

  const { showToast } = useToast();

  async function updateApp(id: string, payload): Promise<any> {
    return;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSaving(true);
      // const uploads = await uploadImages(
      //   [{ fileData: state.favicon, field: "favicon" }].filter((f) =>
      //     Boolean(f.fileData)
      //   )
      // );

      // const images = (uploads as unknown as any)
      //   .filter(Boolean)
      //   .reduce((p, c) => {
      //     return { ...p, [c.field]: c.url };
      //   }, {});
      let currentState = { ...state };

      // if (Boolean(images)) {
      //   currentState = { ...currentState, ...images };
      // }
      const res = await axios.put(`/api/app/${app?.id}`, currentState);
      if (res.data) {
        setSaving(false);
        showToast("success", "Preferences updated");
        router.push(`/a/${props.id}`);
      } else {
        console;
        showToast("error", "An error occured");
        setSaving(false);
      }
    } catch (e) {
      setSaving(false);
      console.log(e);
      showToast("error", "An error occured");
    }
  };

  const [isUniqueAppId, loading] = useIsUniqueAppId(state?.appId);

  React.useEffect(() => {
    if (app) {
      setState(() => app);
    }
  }, [app]);

  if (status === "loading" || loadingApp) {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>Preferences</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 1, pt: 4 }}>
            <Avatar src={props?.image}>{title[0]}</Avatar>
            <h2>{title}</h2>
            <p>By {props?.author?.name || "Unknown author"}</p>
            <Stack spacing={3}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Stack spacing={3}>
                  <Typography variant="h5">App info</Typography>
                  <Box>
                    <TextField
                      error={
                        (isUniqueAppId ||
                          /[^\w-]/.test(state?.appId) ||
                          state?.appId?.length > 18) &&
                        state?.appId !== props?.appId
                      }
                      autoFocus
                      fullWidth
                      onChange={(e) =>
                        setState((p) => ({ ...p, appId: e.target.value }))
                      }
                      placeholder="Choose an app id"
                      type="text"
                      helperText="App id must be unique, and can only contain - as special characters."
                      value={state?.appId}
                      required
                    />
                    {loading && <LinearProgress />}
                    {isUniqueAppId && state?.appId !== props?.appId && (
                      <Alert severity="error">
                        App ID already taken. Please try again.
                      </Alert>
                    )}
                    {/[^\w-]/.test(state?.appId) &&
                      state?.appId !== props?.appId && (
                        <Alert severity="error">
                          App ID can only include alphanumeric characters and -
                          character.
                        </Alert>
                      )}
                    {state?.appId?.length > 15 &&
                      state?.appId !== props?.appId && (
                        <Alert severity="error">
                          App ID can only be upto 15 characters in length.
                        </Alert>
                      )}
                  </Box>

                  <TextField
                    required
                    autoFocus
                    onChange={(e) =>
                      setState((p) => ({ ...p, appId: e.target.value }))
                    }
                    placeholder="App name"
                    type="text"
                    value={state?.name}
                  />
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state?.category}
                        label="Category"
                        onChange={(e) =>
                          setState((s) => ({
                            ...s,
                            appCategoryId: e.target.value as string,
                          }))
                        }
                      >
                        {(categories ?? []).map((cat, ind) => {
                          return (
                            <MenuItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {loadingCategories && <LinearProgress />}
                  </Box>

                  <TextField
                    multiline
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        description: e.target.value,
                      }))
                    }
                    placeholder="A short description for your app. Markdown is supported"
                    rows={8}
                    value={state?.description}
                  />
                  {/* <Box>
                    <ImageField
                      value={image}
                      handleChange={handleLogoChange}
                      desc="Drag and drop or pick an image for your app icon / favicon"
                    />
                  </Box> */}
                </Stack>
              </Paper>
              <Paper elevation={0} sx={{ p: 2 }}>
                <FormGroup>
                  <Stack spacing={3}>
                    <Typography variant="h5">Channels</Typography>
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            value={state.spaces}
                            size="small"
                            onChange={(e) =>
                              setState((p) => ({
                                ...p,
                                spaces: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Spaces"
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            value={state.subdomain}
                            onChange={(e) =>
                              setState((p) => ({
                                ...p,
                                subdomain: e.target.checked,
                              }))
                            }
                            size="small"
                          />
                        }
                        label={`Subdomain (https://${
                          props?.appId ?? "unknown-app"
                        }.dreamfeel.me)`}
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            disabled
                            onChange={(e) =>
                              setState((p) => ({
                                ...p,
                                marketplace: e.target.checked,
                              }))
                            }
                            size="small"
                          />
                        }
                        label="Marketplace"
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        disabled
                        control={
                          <Switch
                            onChange={(e) =>
                              setState((p) => ({
                                ...p,
                                customDomain: e.target.checked,
                              }))
                            }
                            size="small"
                          />
                        }
                        label="Custom domain"
                      />
                    </Box>
                  </Stack>
                </FormGroup>
              </Paper>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Stack spacing={3}>
                  <Typography variant="h5">
                    Title and meta description
                  </Typography>
                  <TextField
                    size="small"
                    onChange={handleChange}
                    name="title"
                    value={state.title}
                    label="Title"
                  />
                  <TextField
                    size="small"
                    onChange={handleChange}
                    name="meta"
                    value={state.meta}
                    multiline
                    label="Meta Description"
                  />
                  <ImageField
                    handleChange={(value) =>
                      setState((p) => ({ ...p, favicon: value[0] }))
                    }
                    value={state?.favicon}
                    desc="Click or drag to upload a favicon"
                  />
                </Stack>
              </Paper>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Stack spacing={3}>
                  <Typography variant="h5">App password</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch size="small" checked defaultChecked />}
                      label="Your app is password protected"
                    />
                  </FormGroup>
                  <TextField
                    size="small"
                    placeholder="Choose a password"
                    value={state.password}
                    name="password"
                    onChange={handleChange}
                    label="Password"
                  />
                  <TextField
                    size="small"
                    value={state.passwordProtectionMessage}
                    name="passwordProtectionMessage"
                    onChange={handleChange}
                    multiline
                    placeholder="Message to your visitors"
                  />
                </Stack>
              </Paper>
              <Box>
                <Button
                  type={"submit"}
                  disabled={saving}
                  disableElevation
                  fullWidth
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  {saving ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Update preferences"
                  )}
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={Router.back}
                  fullWidth
                  variant="outlined"
                  sx={{ textTransform: "none", mb: 6 }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
      </form>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default App;
