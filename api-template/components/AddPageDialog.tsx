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
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import renderPage from "./util/renderPage";
import ImageField from "./ImageField";
import { useActions } from "./ToggleButtons";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPage() {
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

  const { changePage, deletePage, handleAddPage } = useActions();

  const handleCustomize = () => {
    changePage(Number(selectedIndex));
    setOpen(false);
  };

  const handleDeletePage = () => {
    deletePage(Number(selectedIndex));
    setOpen(false);
  };

  const handleNewPage = () => {
    handleAddPage();
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        size="small"
        fullWidth
        variant="outlined"
        onClick={handleClickOpen}
      >
        Pages
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
              Pages
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
          <Toolbar />
          {/* <NewPageForm /> */}
          <Grid container>
            <Grid sx={{ maxHeight: "69vh", overflow: "auto" }} item xs={3}>
              <Toolbar>
                <Typography sx={{ flexGrow: 1 }}>Pages</Typography>
                <Button
                  onClick={handleAddPage}
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                >
                  Add page
                </Button>
              </Toolbar>
              <Divider />
              <List>
                {pages.map((page, index) => {
                  return (
                    <ListItemButton
                      dense
                      key={index}
                      selected={index === selectedIndex}
                      onClick={() => handlePageChange(index)}
                    >
                      <ListItemText
                        secondary={page.layout}
                        primary={page.name}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={6}>
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4">
                    {pages[selectedIndex]?.name}
                  </Typography>
                  <Typography variant="caption">
                    Page path: {pages[selectedIndex]?.path ?? "/"}
                  </Typography>
                </Box>
                <Button
                  onClick={handleCustomize}
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                >
                  Customize page
                </Button>
                <Button
                  onClick={handleDeletePage}
                  color="error"
                  sx={{ ml: 2, textTransform: "none" }}
                  variant="outlined"
                >
                  Delete page
                </Button>
              </Toolbar>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  mt: 2,
                  maxHeight: "69vh",
                  overflow: "auto",
                  p: 1,
                }}
              >
                {renderPage(pages[selectedIndex])}
              </Paper>
            </Grid>
            <Grid item xs>
              <Toolbar>
                <Typography variant="h6">Page Properties</Typography>
              </Toolbar>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Layout
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={10}
                      label="Layout"
                      onChange={() => {}}
                    >
                      <MenuItem value={10}>Page</MenuItem>
                      <MenuItem value={20}>Dashboard</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField label="Route" size="small" value={"/"} />
                  <TextField label="Name" size="small" value={"/page"} />
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked={false} />}
                      label="Include nested pages"
                    />
                  </FormGroup>
                  <TextField label="Title" size="small" value={"App"} />
                  <TextField
                    label="Meta description"
                    size="small"
                    value={"/"}
                  />
                  <ImageField
                    value={null}
                    handleChange={() => {}}
                    desc="Upload page favicon"
                  />
                  <Button
                    sx={{ textTransform: "none" }}
                    disableElevation
                    variant="contained"
                  >
                    Update changes
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
