import React, { useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import router from "next/router";

import useUpload from "../../../../hooks/useUpload";
import { AuthSpinner } from "../../..";
import Layout from "../../../../components/Layout";
import useTables, { useTableActions } from "../../../../hooks/useTables";
import ResDash from "../../../../components/ResouceLayout";
import { useAxios } from "../../../../hooks/useAxios";
import useToast from "../../../../hooks/useToast";

const CreateRecord: React.FC = () => {
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
  const { showToast } = useToast();

  const axios = useAxios();

  const { updateApps: updateTables } = useTableActions();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      tableId: table?.id,
      rowDraft: JSON.stringify(state ?? {}),
    };
    const res = await axios.post(`/api/resource/data/row`, { ...payload });
    if (res.data) {
      let tabl = {
        ...table,
        rows: [...(table.rows ?? []), JSON.parse(res.data.rowDraft ?? "")],
      };
      showToast("success", "Record saved");
      setSaving(false);
      return;
    }
    setSaving(false);
    showToast("error", "An error occured, Record not saved");
  };

  const handleLogoChange = React.useCallback((data) => {
    // setImage(data[0]);
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
            <Box sx={{ display: "flex", mb: 4 }}>
              <Box sx={{ flexGrow: 1 }}>
                <h1>New Record</h1>
              </Box>
              <Box>
                <Button
                  disableElevation
                  color="error"
                  variant="outlined"
                  className="back"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
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

export default CreateRecord;
