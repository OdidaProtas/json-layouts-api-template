import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import ImageField from "../components/ImageField";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useUpload from "../hooks/useUpload";
import { useSession } from "next-auth/react";
import { AuthSpinner } from ".";
import useApps, { useAppActions } from "../hooks/useApps";
import { useAxios } from "../hooks/useAxios";
import useToast from "../hooks/useToast";
import useIsUniqueAppId from "../hooks/useIsUniqueAppId";
import useCategories from "../hooks/useCategories";
import { usePagesStateValue } from "../lib/builder";
import useIsWhiteListSubdomain from "../hooks/useWhiteListSubdomains";

const Create: React.FC = () => {
  const [name, setName] = useState("");
  const [appId, setAppId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");

  const { data: session, status } = useSession();

  const [saving, setSaving] = useState(false);

  const uploadFiles = useUpload();

  const apps = useApps();
  const { showToast } = useToast();

  const { updateApps } = useAppActions();
  const axios = useAxios();
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    const uploads = await uploadFiles([{ fileData: image, field: "image" }]);

    const images = (uploads as unknown as any).reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});
    let currentState = {
      name,
      description,
      appCategoryId: type,
      email: session?.user?.email,
      appId,
    };

    if (Boolean(images)) {
      currentState = { ...currentState, ...images };
    }
    try {
      const res = await axios.post("/api/app", { ...currentState });
      if (res.data) {
        setSaving(false);
        updateApps([
          ...apps,
          {
            ...res.data,
            isNew: true,
            author: {
              email: session?.user?.email,
              image: session?.user?.image,
              name: session?.user?.name,
            },
          },
        ]);
        showToast("success", "App created successfully");
        await Router.push("/m");
      }
    } catch (error) {
      showToast("error", "App creation failed");
      setSaving(false);
    }
  };

  const handleLogoChange = React.useCallback((data) => {
    setImage(data[0]);
  }, []);

  const [isUniqueAppId, loading] = useIsUniqueAppId(appId);
  const categories = useCategories();

  const loadingCategories = usePagesStateValue("loaders.categories");

  const isWhiteListSubdomain = useIsWhiteListSubdomain(appId);

  if (status === "loading") {
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

  return (
    <Layout>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <form style={{ flexGrow: 1 }} onSubmit={submitData}>
          <Stack spacing={4}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">New App</Typography>
              <Box>{/* <Button>Go back</Button> */}</Box>
            </Box>
            <Box>
              <TextField
                error={
                  isUniqueAppId ||
                  /[^\w-]/.test(appId) ||
                  appId?.length > 18 ||
                  isWhiteListSubdomain
                }
                autoFocus
                fullWidth
                onChange={(e) => setAppId(e.target.value)}
                placeholder="Choose an app id"
                type="text"
                helperText="App id must be unique, and can only contain - as special characters."
                value={appId}
                required
              />
              {loading && <LinearProgress />}
              {isUniqueAppId && (
                <Alert severity="error">
                  App ID already taken. Please try again.
                </Alert>
              )}
              {/[^\w-]/.test(appId) && (
                <Alert severity="error">
                  App ID can only include alphanumeric characters and -
                  character.
                </Alert>
              )}
              {appId?.length > 15 && (
                <Alert severity="error">
                  App ID can only be upto 15 characters in length.
                </Alert>
              )}

              {isWhiteListSubdomain && (
                <Alert severity="error">
                  ${appId} cannot be set as appID.
                </Alert>
              )}
            </Box>
            <TextField
              onChange={(e) => setName(e.target.value)}
              placeholder="App name"
              type="text"
              value={name}
            />
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Category"
                  onChange={(e) => setType(e.target.value as string)}
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description for your app. Markdown is supported"
              rows={8}
              value={description}
            />
            <Box>
              <ImageField
                value={image}
                handleChange={handleLogoChange}
                desc="Drag and drop or pick an image for your app icon / favicon"
              />
            </Box>

            <Button
              variant="contained"
              disableElevation
              disabled={
                !name ||
                !description ||
                !image ||
                saving ||
                /[^\w-]/.test(appId) ||
                loading
              }
              type="submit"
            >
              {saving ? <CircularProgress size={20} /> : "Create app"}
            </Button>
            <Button
              disableElevation
              color="error"
              variant="outlined"
              className="back"
              href="#"
              onClick={() => Router.push("/")}
            >
              or Cancel
            </Button>
          </Stack>
        </form>
        <Box sx={{ flexGrow: 1 }}></Box>
      </Box>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Create;
