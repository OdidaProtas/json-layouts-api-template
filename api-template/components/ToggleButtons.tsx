import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Select,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import React from "react";
import { useRouter } from "next/router";
import helloWorld from "../lib/defaultApp";
import useToast from "../hooks/useToast";

export default function ToggleButtons({ app }) {
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const { changePage } = useActions();

  const router = useRouter();

  const [saving, setSaving] = React.useState(false);

  const { showToast } = useToast();

  function updateApp(id: string, payload) {
    fetch(`/api/app/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
      .then(() => {
        setSaving(false);
        showToast("success", "App saved");
        router.push(`/a/${id}`);
      })
      .catch((e) => {
        showToast("error", "Save failed");
        setSaving(false);
      });
  }

  const handleSave = (e) => {
    setSaving(true);
    updateApp(app.id, {
      ...app,
      draft: JSON.stringify(pages),
    });
  };

  return (
    <Box sx={{ mb: 3, display: "flex" }}>
      <Box sx={{ width: 180, mr: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Select page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageIndex}
            label="Select page"
            onChange={(e) => changePage(parseInt(e.target.value))}
          >
            {pages.map((page, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {index + 1} {page.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {/* <Box sx={{ width: 200 }}>
        <AddPageDialog />
      </Box> */}
      <Box>
        <Box sx={{ width: 140, ml: 2 }}>
          <Button
            size="small"
            fullWidth
            disabled={saving}
            onClick={handleSave}
            sx={{ textTransform: "none" }}
            disableElevation
            variant="contained"
          >
            {saving ? <CircularProgress size={20} /> : "Save Changes"}
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: 80, ml: 2 }}>
        <Button
          fullWidth
          sx={{ textTransform: "none" }}
          size="small"
          disabled={saving}
          onClick={() => router.push("/")}
          disableElevation
          variant="outlined"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export function useActions() {
  const dispatch = usePagesStateValue("dispatch");

  const pages = usePagesStateValue("pages");

  return {
    changePage(index: number) {
      const type = "update_all";
      const payload = index;
      const key = "pageIndex";
      dispatch({ type, key, payload });
    },
    deletePage(index) {
      const type = "update_all";
      let payload = [...pages];
      payload.splice(index, 1);
      const key = "pages";
      dispatch({ type, key, payload });
    },
    handleAddPage() {
      const type = "update_all";
      let payload = [...pages, helloWorld];
      const key = "pages";
      dispatch({ type, key, payload });
    },
  };
}
