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
import { Box, Container, Grid, Stack, TextField } from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { usePagesStateValue } from "../lib/builder";
import useApi from "../hooks/useApi";
import { components } from "./ComponentForm";
import renderComponents from "./util/renderComponents";
import dynamic from "next/dynamic";

const Code = dynamic(import("./Code"), {
  ssr: false,
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResourceFormDialog({ type = "box" }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resourceGroups = usePagesStateValue("resourceGroups");

  const [{ images, tables } = { images: [], tables: [] }] = useApi();
  const loadingApi = usePagesStateValue("loaders.api");

  const blackList = ["box", "container"];

  if (blackList.includes(type)) return null;

  const component = components["type"];

  const keys = Object.keys(component ?? {});

  return (
    <div>
      <Button
        size="small"
        fullWidth
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Link api
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
              Resources
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Toolbar />
          <Container>
            <Stack spacing={6}>
              {type === "image" && (
                <Stack spacing={3}>
                  <Typography variant="h4">Select image</Typography>
                  {!Boolean(images?.length) && (
                    <Typography>
                      No media have been added to this app
                    </Typography>
                  )}
                  {Boolean(images?.length) && (
                    <Box>
                      <Grid container spacing={2}>
                        {images.map((image) => {
                          return (
                            <Grid item xs={3} key={image.id}>
                              <Stack spacing={1}>
                                <img
                                  height={"200"}
                                  width={"100%"}
                                  src={image.url}
                                  alt=""
                                />
                                <TextField size="small" label="Alt text" />
                                <Box>
                                  <Grid container spacing={2}>
                                    <Grid item xs>
                                      <TextField size="small" label="Height" />
                                    </Grid>
                                    <Grid item xs>
                                      <TextField size="small" label="Width" />
                                    </Grid>
                                  </Grid>
                                </Box>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                >
                                  Use image
                                </Button>
                              </Stack>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  )}
                </Stack>
              )}
              {type !== "image" && (
                <>
                  <Box>
                    <Grid container spacing={2}>
                      {tables?.map((table) => {
                        return (
                          <Grid item xs={4} key={table.id}>
                            <Stack spacing={1}>
                              <Typography variant="h4">
                                {table.name} Collection
                              </Typography>
                              <BasicTabs collection={table} type={type} />
                              {type === "form" && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  fullWidth
                                >
                                  Create form
                                </Button>
                              )}
                            </Stack>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </>
              )}
            </Stack>
          </Container>
        </div>
      </Dialog>
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ type, collection }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let json;

  const columns = collection?.columns;

  function componenttransform() {
    if (type === "form") {
      return columns.map((col) => ({
        ...components["textfield"],
        data: { label: col.key },
      }));
    }
    return {};
  }

  const componentsJson = componenttransform();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Components" {...a11yProps(0)} />
          <Tab label="JSON" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack spacing={2}>{renderComponents(componentsJson ?? [])}</Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Code state={componentsJson ?? {}} />
      </TabPanel>
    </Box>
  );
}
