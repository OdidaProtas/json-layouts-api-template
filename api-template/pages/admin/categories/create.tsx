import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import useUpload from "../../../hooks/useUpload";
import useApps, { useAppActions } from "../../../hooks/useCategories";
import useToast from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { Router, useRouter } from "next/router";
import Layout from "../../../components/Layout";
import ImageField from "../../../components/ImageField";
import { AuthSpinner } from "../..";

const Create: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Other");

  const { data: session, status } = useSession();

  const [saving, setSaving] = useState(false);

  const uploadFiles = useUpload();

  const Router = useRouter();

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
    let currentState = { name, description, type, email: session?.user?.email };

    if (Boolean(images)) {
      currentState = { ...currentState, ...images };
    }
    try {
      const res = await axios.post("/api/category", { ...currentState });
      if (res.data) {
        setSaving(false);
        updateApps([
          ...apps,
          {
            ...res.data,
            isNew: true,
            // author: {
            //   email: session?.user?.email,
            //   image: session?.user?.image,
            //   name: session?.user?.name,
            // },
          },
        ]);
        showToast("success", "App created successfully");
        await Router.push(`/admin/categories/${res.data.id}`);
      }
    } catch (error) {
      showToast("error", "App creation failed");
      setSaving(false);
    }
  };

  const handleLogoChange = React.useCallback((data) => {
    setImage(data[0]);
  }, []);

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
          <Stack spacing={2}>
            <h1>New Category</h1>
            <TextField
              label="Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              type="text"
              value={name}
            />

            <TextField
              label="Description"
              multiline
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description (Markdown is supported)"
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
              disabled={!name || saving}
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
