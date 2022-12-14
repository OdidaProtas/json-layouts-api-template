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
import { useAxios } from "../hooks/useAxios";
import AddPage from "./AddPageDialog";

export default function ToggleButtons({ app }) {
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const { changePage } = useActions();

  const router = useRouter();

  const [saving, setSaving] = React.useState(false);

  const { showToast } = useToast();

  const axios = useAxios();

  async function updateApp(id: string, payload) {
    const res = await axios.put(`/api/app/${id}`, { ...payload });
    if (res.data) {
      setSaving(false);
      showToast("success", "Changes saved");
      // router.push(`/a/${id}`);
      return;
    }
    showToast("error", "Save failed");
    setSaving(false);
  }

  const handleSave = (e) => {
    setSaving(true);
    updateApp(app.id, {
      ...app,
      draft: JSON.stringify(pages),
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: 180, mr: 2 }}>
        {/* <FormControl size="small" fullWidth>
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
        </FormControl> */}
      </Box>
      <Box sx={{ width: 100, pt: 2 }}>
        <AddPage />
      </Box>
      <Box>
        <Box sx={{ width: 140, ml: 2, pt: 2 }}>
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
