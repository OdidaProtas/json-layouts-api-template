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
import { Box, Divider, Paper, Stack, TextField } from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import router from "next/router";
import useResourceGroups, {
  useResourceGroupsActions,
} from "../hooks/useResourceGroups";
import { useAxios } from "../hooks/useAxios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateResourceGroupDialog({ resourceGroups = [] }) {
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

  const { updateApps: updateResourceGroups } = useResourceGroupsActions();

  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...state, appId: router.query.id };
      const res = await axios.post("/api/resource", body);
      if (res.data) {
        setSaving(false);
        updateResourceGroups([...resourceGroups, { ...res.data, isNew: true }]);
        setOpen(false);
      }
    } catch (error) {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((p) => ({ ...p, [name]: value }));
  };

  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add
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
              Create Resource
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
          <Toolbar />
          {/* <NewPageForm /> */}
          <Grid container>
            <Grid sx={{ maxHeight: "69vh", overflow: "auto" }} item xs={3}>
              <Toolbar></Toolbar>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  mt: 2,
                  overflow: "auto",
                  p: 1,
                }}
              >
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">New Resource group</Typography>
                  </Box>
                </Toolbar>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      onChange={handleChange}
                      name="name"
                      fullWidth
                      label="Name"
                      required
                    />
                    <TextField
                      onChange={handleChange}
                      name="tag"
                      fullWidth
                      required
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
                      sx={{ textTransform: "none" }}
                      fullWidth
                      disabled={saving}
                      disableElevation
                      variant="contained"
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
