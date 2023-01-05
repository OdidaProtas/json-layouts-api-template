import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

import { usePagesStateValue } from "../lib/builder";
import { useRouter } from "next/router";
import { Tune } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CaategoryDialog({ appId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pages = usePagesStateValue("pages");

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handlePageChange = (index) => setSelectedIndex(index);

  const [state, setState] = React.useState({
    name: "",
    description: "",
    tag: "",
  });

  const [saving, setSaving] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { ...state, appId };
      const res = await fetch("/api/resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.json()) {
        setSaving(false);
        router.push(`/res/${appId}`);
      }
    } catch (error) {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((p) => ({ ...p, [name]: value }));
  };

  const categories = getCategories();

  return (
    <>
      <Button
        sx={{ textTransform: "none", mt: 2 }}
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<Tune />}
      >
        More filters
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} sx={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Categories and filters
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
          <Toolbar />
          {/* <NewPageForm /> */}
          <Grid container>
            <Grid sx={{ maxHeight: "69vh", overflow: "auto" }} item xs={3}>
              <Toolbar>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Categories
                </Typography>
              </Toolbar>
              <Divider />
              <List dense>
                {categories.map((category) => {
                  return (
                    <ListItem key={category}>
                      <ListItemButton>
                        <ListItemText primary={category} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  mt: 2,
                  overflow: "auto",
                  p: 1,
                  minHeight: "69vh",
                }}
              >
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={categories.map((category) => ({
                        label: category,
                        value: category,
                      }))}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Search Category" />
                      )}
                    />
                    {/* <Typography variant="h6">New Resource group</Typography> */}
                  </Box>
                </Toolbar>
                {/* <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      onChange={handleChange}
                      name="name"
                      fullWidth
                      label="Name"
                    />
                    <TextField
                      onChange={handleChange}
                      name="tag"
                      fullWidth
                      label="Tag"
                    />
                    <TextField
                      onChange={handleChange}
                      name="description"
                      multiline
                      rows={8}
                      fullWidth
                      label="Description"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      disableElevation
                      variant="contained"
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </Stack>
                </form> */}
                <Typography variant="body1">No subcategories found</Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
}

var categories = {
  Other: {
    children: [],
  },
};

function getCategories() {
  return Object.keys(categories);
}
