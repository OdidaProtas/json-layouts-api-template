import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import router from "next/router";

import useUpload from "../../../../hooks/useUpload";
import { AuthSpinner } from "../../..";
import Layout from "../../../../components/Layout";
import ImageField from "../../../../components/ImageField";
import useTables from "../../../../hooks/useTables";
import ResDash from "../../../../components/ResouceLayout";

const Draft: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Other");

  const { data: session, status } = useSession();

  const table = useTables() ?? { name: "Unknown table", columns: [] };

  const [state, setState] = useState(() => {
    return table.columns.reduce((p, c) => {
      return { ...p, [c.key]: "" };
    }, {});
  });

  const handleStateChange = (e) =>
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));

  const [saving, setSaving] = useState(false);

  const uploadFiles = useUpload();

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
      const body = { ...currentState };
      const res = await fetch("/api/app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res) setSaving(false);
      await router.push("/m");
    } catch (error) {
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
        <h1>Record</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <ResDash>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <form style={{ flexGrow: 1 }} onSubmit={submitData}>
          <Stack spacing={2}>
            <h1>New Record</h1>
            <h1>Table: {table?.name}</h1>
            {table.columns.map((column) => {
              return (
                <TextField
                  key={column.key}
                  autoFocus
                  onChange={handleStateChange}
                  type="text"
                  label={column.key}
                  value={state[column.key]}
                  name={column.key}
                />
              );
            })}

            <Button variant="contained" disableElevation type="submit">
              {saving ? <CircularProgress size={20} /> : "Save"}
            </Button>
            <Button
              disableElevation
              color="error"
              variant="outlined"
              className="back"
              href="#"
              onClick={() => router.back()}
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
    </ResDash>
  );
};

export default Draft;
