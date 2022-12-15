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
import AddPageDialog from "./AddPageDialog";
import { GetServerSideProps } from "next";
import React from "react";
import prisma from "../lib/prisma";
import { Router, useRouter } from "next/router";

export default function ToggleButtons({ app }) {
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex");
  const { changePage } = useActions();

  const router = useRouter();

  const [saving, setSaving] = React.useState(false);

  function updateApp(id: string, payload) {
    fetch(`/api/app/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    })
      .then(() => {
        setSaving(false);
        router.push(`/a/${id}`);
      })
      .catch((e) => {
        setSaving(false);
        alert("An error occured, try again");
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
      <Box sx={{ width: 200 }}>
        <AddPageDialog />
      </Box>
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

function useActions() {
  const dispatch = usePagesStateValue("dispatch");

  return {
    changePage(index: number) {
      const type = "update_all";
      const payload = index;
      const key = "pageIndex";
      dispatch({ type, key, payload });
    },
  };
}
