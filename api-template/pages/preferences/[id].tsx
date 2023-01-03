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
} from "@mui/material";
import ImageField from "../../components/ImageField";
import useUpload from "../../hooks/useUpload";
import { AuthSpinner } from "..";
import useApp from "../../hooks/useApp";
import { usePagesStateValue } from "../../lib/builder";

const App: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const app = useApp();
  const props = app ?? { name: "" }; // to ref
  const loadingApp = usePagesStateValue("loaders.apps");
  const [state, setState] = React.useState(() => props);
  const [saving, setSaving] = React.useState(false);

  let title = props?.name;
  if (!props?.published) {
    title = `${title} (Draft)`;
  }

  const handleChange = (e) =>
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));

  const uploadImages = useUpload();

  async function updateApp(id: string, payload): Promise<any> {
    return await fetch(`/api/app/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const uploads = await uploadImages([
      { fileData: state.favicon, field: "favicon" },
    ]);

    const images = (uploads as unknown as any).reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});
    let currentState = { ...state };

    if (Boolean(images)) {
      currentState = { ...currentState, ...images };
    }
    const res = await updateApp(props?.id, { ...currentState });
    if (res) {
      setSaving(false);
    } else {
      setSaving(false);
    }
  };

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
            <Stack
              spacing={3}
            >
              <Paper elevation={0} sx={{ p: 2 }}>
                <Stack spacing={3}>
                  <Typography variant="h5">Channels</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch size="small" defaultChecked />}
                      label="DREAMFEEL SPACES"
                    />
                    <FormControlLabel
                      control={<Switch size="small" defaultChecked />}
                      label={`ID Subdomain (https://${
                        props?.appId ?? "unknown-app"
                      }.dreamfeel.me`}
                    />
                    <FormControlLabel
                      disabled
                      control={<Switch size="small" />}
                      label="Dreamfeel Marketplace for product resources"
                    />
                    <FormControlLabel
                      disabled
                      control={<Switch size="small" />}
                      label="Custom domain"
                    />
                  </FormGroup>
                </Stack>
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
                  sx={{ mb: 6 }}
                  fullWidth
                  variant="outlined"
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
