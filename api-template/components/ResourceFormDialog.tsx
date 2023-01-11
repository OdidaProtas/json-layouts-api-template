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
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { usePagesStateValue } from "../lib/builder";
import useApi from "../hooks/useApi";
import { components } from "./ComponentForm";
import renderComponents from "./util/renderComponents";
import dynamic from "next/dynamic";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ComponentsAPI from "./api";

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

  const blackList = [];

  if (blackList.includes(type)) return null;

  const component = components["type"];

  const keys = Object.keys(component ?? {});

  return (
    <div>
      <Button
        size="small"
        fullWidth
        variant="outlined"
        sx={{ textTransform: "none", mb: 2 }}
        onClick={handleClickOpen}
      >
        Configure API
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
                          <Grid item xs={6} key={table.id}>
                            <Stack spacing={1}>
                              <Typography variant="h4">{table.name}</Typography>
                              <BasicTabs collection={table} type={type} />
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

function BasicTabs({ type, collection, procedure = "" }) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const columns = collection?.columns ?? [];
  const rows = collection?.rows ?? [];

  const filteredColumns = columns.filter((col) => checked.includes(col.id));

  const [labelKey, setLabelKey] = React.useState("");
  const [valueKey, setValueKey] = React.useState("");

  const isOptions = components[type]?.data?.api?.procedure === "options";
  const isTable = components[type]?.data?.api?.procedure === "table";
  const isMap = components[type]?.data?.api?.procedure === "map";
  const isDetail = components[type]?.data?.api?.procedure === "item";

  const mapKeys = columns.map((col) => col.key);

  const [componentMapType, setComponentMapType] = React.useState("text");

  const component = components[componentMapType];

  const omitMapComponentData = Object.keys(component?.data ?? {});

  const omitMapOptions = ["components", "options", "items", "api", "actions"];

  const mapComponentDataKeys = omitMapComponentData.filter(
    (key) => !omitMapOptions.includes(key)
  );

  const componentDataObj = mapComponentDataKeys.reduce((prev, curr) => {
    return { ...prev, [curr]: "" };
  }, {});

  const [mapState, setMapState] = React.useState({ ...componentDataObj });

  const handleMapChange = (e) => {
    setMapState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleMapTypeChange = ({ value }) => {
    setComponentMapType(value);
    setMapState(componentDataObj);
  };

  function componentsApiTransform() {
    if (type === "form") {
      return {
        ...components["form"],
        data: {
          ...components["form"].data,
          components: [],
          api: {
            id: collection.id,
            type: "collection",
            procedure: "form",
            buttonText: "Save",
            fields: checked.map((c) => {
              const column = columns.find((col) => col.id === c);
              return column?.key;
            }),
          },
        },
      };
    }
    if (isOptions)
      return {
        ...components[type],
        data: {
          ...components[type].data,
          components: [],
          options: [],
          api: {
            id: collection.id,
            type: "collection",
            procedure: "options",
            labelKey,
            valueKey,
          },
        },
      };
    if (isTable)
      return {
        ...components["table"],
        data: {
          ...components[type].data,
          components: [],
          options: [],
          api: {
            id: collection.id,
            type: "collection",
            procedure: "table",
            labelKey,
            valueKey,
            fields: checked.map((c) => {
              const column = columns.find((col) => col.id === c);
              return column?.key;
            }),
          },
        },
      };
    if (isMap)
      return {
        ...components[type],
        data: {
          ...components[type].data,
          components: [],
          options: [],
          api: {
            id: collection.id,
            type: "collection",
            procedure: "map",
            mapType: componentMapType,
            fields: checked.map((c) => {
              const column = columns.find((col) => col.id === c);
              return column?.key;
            }),
            mapState,
          },
        },
      };
    if (isDetail) {
      return {
        ...components[type],
        data: {
        ...components[type]?.data,
          api: {
            id: collection.id,
            type: "item",
            procedure: "item",
            mapType: componentMapType,
            fields: checked.map((c) => {
              const column = columns.find((col) => col.id === c);
              return column?.key;
            }),
            mapState,
          },
        },
      };
    }
  }

  const submitButton = {
    ...components["button"],
    data: {
      ...components["button"].data,
      text: "Save",
    },
  };

  function componentsTransform() {
    if (type === "form") {
      return {
        ...components["form"],
        data: {
          ...components["form"].data,
          components: [
            ...filteredColumns.map((col) => {
              return {
                ...components["textfield"],
                data: {
                  ...components["textfield"].data,
                  label: col.key,
                },
              };
            }),
            submitButton,
          ],
        },
      };
    }
    if (isOptions) {
      return {
        ...components[type],
        data: {
          ...components[type].data,
          options: [
            ...rows.map((row) => {
              const data = JSON.parse(row.rowDraft ?? "{}");
              return {
                label: data[labelKey],
                value: data[valueKey],
              };
            }),
          ],
        },
      };
    }
    if (isTable) {
      return {
        error: "This component required the api",
      };
    }
    if (isMap)
      return {
        ...components[type],
        data: {
          ...components[type].data,
          components: [
            ...(rows ?? []).map((row) => {
              const typeKeys = Object.keys(
                components[componentMapType]?.data ?? {}
              );
              const newValues = typeKeys.reduce((prev, curr) => {
                return { ...prev, [curr]: mapState[curr] };
              }, {});
              return {
                ...components[componentMapType],
                data: { ...components[componentMapType]?.data, ...newValues },
              };
            }),
          ],
          options: [],
          api: {
            id: "",
            type: "collection",
            procedure: "map",
            labelKey,
            valueKey,
            fields: checked.map((c) => {
              const column = columns.find((col) => col.id === c);
              return column?.key;
            }),
          },
        },
      };
    return {};
  }

  const componentsJ = componentsTransform();
  const componentsJson = componentsApiTransform();

  function handleOptionChange(value, which) {
    if (which === "label") {
      setLabelKey(value);
    } else setValueKey(value);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Configure" {...a11yProps(0)} />
          <Tab label="Preview" {...a11yProps(1)} />
          <Tab label="API" {...a11yProps(2)} />
          <Tab label="JSON" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {type === "form" && (
          <CheckboxListSecondary
            handleToggle={handleToggle}
            checked={checked}
            columns={columns}
          />
        )}
        {type === "table" && (
          <CheckboxListSecondary
            handleToggle={handleToggle}
            checked={checked}
            columns={columns}
          />
        )}
        {isOptions && (
          <OptionValue
            handleChange={handleOptionChange}
            valueKey={valueKey}
            labelKey={labelKey}
            columns={columns}
          />
        )}
        {isMap && (
          <ComponentsAPI
            handleMapTypeChange={handleMapTypeChange}
            componentMapType={componentMapType}
            mapComponentDataKeys={mapComponentDataKeys}
            mapState={mapState}
            handleMapChange={handleMapChange}
            mapKeys={mapKeys}
          />
        )}
        {isDetail && (
          <ComponentsAPI
            isDetail
            handleMapTypeChange={handleMapTypeChange}
            componentMapType={componentMapType}
            mapComponentDataKeys={mapComponentDataKeys}
            mapState={mapState}
            handleMapChange={handleMapChange}
            mapKeys={mapKeys}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack spacing={2}>{renderComponents([componentsJson ?? []])}</Stack>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Code state={componentsJson ?? {}} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Code state={componentsJ ?? {}} />
      </TabPanel>
    </Box>
  );
}

function CheckboxListSecondary({ columns = [], handleToggle, checked }) {
  return (
    <>
      <Typography variant="h6">Select fields</Typography>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {[...columns].map((column) => {
          const labelId = `checkbox-list-secondary-label-${column.id}`;
          return (
            <ListItem
              key={column.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(column.id)}
                  checked={checked.includes(column.id)}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={column.key} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

function OptionValue({ valueKey, labelKey, handleChange, columns = [] }) {
  const keys = columns.map((col) => col.key);
  return (
    <Box>
      <Grid>
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Label key</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={labelKey}
              label="Label"
              onChange={(e) => handleChange(e.target.value, "label")}
            >
              {keys.map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl sx={{ mt: 4 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Value key</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueKey}
              label="Value"
              onChange={(e) => handleChange(e.target.value, "value")}
            >
              {keys.map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
