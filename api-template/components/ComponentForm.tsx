import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
  Autocomplete,
  Grid,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import BrowseComponents from "./BrowseComponents.Dialog";

interface IC {
  data?: any;
  index?: number;
  handleTypeChange?: any;
  type: string;
  handleComponentTypeChange: any;
  handleComponentDataTypeChange: any;
  deleteChildComponent: any;
  handleCheck: any;
  handleChange: any;
  handleAddChildComponent?: any;
  handleChangeOption: any;
  handleAddOption: any;
  handleDeleteOption: any;
}

export const ComponentSelect = ({
  value,
  onChange,
  toggleBrowse = () => {},
}: any) => {
  const componentData = Object.keys(components ?? {}).map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <>
      <BrowseComponents toggleBrowse={toggleBrowse} select={onChange} />
      <Autocomplete
        sx={{ mb: 3 }}
        size="small"
        disablePortal
        value={value}
        onChange={(e, o) => onChange(o ?? { value: "text" })}
        id="combo-box-demo"
        options={componentData}
        renderInput={(params) => (
          <TextField {...params} label="Search component" />
        )}
      />
    </>
  );
};

export default function ComponentForm({
  data: state,
  handleComponentTypeChange,
  handleComponentDataTypeChange,
  deleteChildComponent,
  handleChange,
  handleCheck,
  handleAddChildComponent,
  handleChangeOption,
  handleAddOption,
  handleDeleteOption,
}: IC) {
  const componentData = Object.keys(components ?? {}).map((key) => ({
    label: key,
    value: key,
  }));
  return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2}>
        {Object.keys(state?.data ?? {})?.map((key, idx) => {
          if (typeof state?.data[key] === "object") {
            const obj = state?.data[key];
            return (
              <Box key={idx}>
                {key === "components" && (
                  <>
                    <Stack spacing={2} sx={{ p: 2 }}>
                      {!(obj ?? [])?.length && (
                        <>
                          <Typography variant="caption">{key}</Typography>

                          <Box>
                            <Button
                              fullWidth
                              onClick={() => handleAddChildComponent(0)}
                              sx={{ textTransform: "none" }}
                              variant="outlined"
                            >
                              Add component
                            </Button>
                          </Box>
                        </>
                      )}
                      {(obj ?? []).map((scComponent, componentIndex) => {
                        return (
                          <>
                            <Paper sx={{ width: "100%", p: 1 }}>
                              <Autocomplete
                                sx={{ mb: 3 }}
                                size="small"
                                disablePortal
                                value={scComponent.type}
                                onChange={(e, o) =>
                                  handleComponentTypeChange(
                                    o ?? { value: "text" },
                                    componentIndex
                                  )
                                }
                                id="combo-box-demo"
                                options={componentData}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Change component"
                                  />
                                )}
                              />

                              <Divider sx={{ my: 2 }} />
                              <Stack spacing={2}>
                                {Object.keys(scComponent.data ?? []).map(
                                  (schild, sindex) => {
                                    if (
                                      typeof scComponent?.data[schild] ===
                                      "boolean"
                                    ) {
                                      return (
                                        <>
                                          <FormGroup>
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  size="small"
                                                  name={schild}
                                                  onChange={(e) =>
                                                    handleComponentDataTypeChange(
                                                      e,
                                                      componentIndex,
                                                      { check: true }
                                                    )
                                                  }
                                                  value={
                                                    scComponent?.data[schild]
                                                  }
                                                  defaultChecked={
                                                    scComponent?.data[schild]
                                                  }
                                                />
                                              }
                                              label={schild}
                                            />
                                          </FormGroup>
                                        </>
                                      );
                                    }

                                    if (schild === "components") {
                                      return null;
                                    }

                                    if (schild === "options") {
                                      return (
                                        <>
                                          <Typography variant="caption">
                                            {schild}
                                          </Typography>
                                          {(scComponent.data.options ?? []).map(
                                            (option, optImdex) => {
                                              return (
                                                <Box
                                                  sx={{ my: 2 }}
                                                  key={optImdex}
                                                >
                                                  <Typography sx={{ mb: 1 }}>
                                                    {optImdex + 1}
                                                  </Typography>
                                                  <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                      <TextField
                                                        size="small"
                                                        fullWidth
                                                        label={"Label"}
                                                        name="label"
                                                        value={option.label}
                                                        // onChange={(e) =>
                                                        //   handleChangeOption(
                                                        //     e,
                                                        //     optImdex
                                                        //   )
                                                        // }
                                                      />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                      <TextField
                                                        size="small"
                                                        fullWidth
                                                        name="value"
                                                        label={"Value"}
                                                        value={option.value}
                                                        // onChange={(e) =>
                                                        //   handleChangeOption(
                                                        //     e,
                                                        //     optImdex
                                                        //   )
                                                        // }
                                                      />
                                                    </Grid>
                                                  </Grid>
                                                  <Box>
                                                    <Button
                                                      fullWidth
                                                      onClick={() =>
                                                        handleDeleteOption(
                                                          optImdex
                                                        )
                                                      }
                                                      sx={{
                                                        textTransform: "none",
                                                        mt: 2,
                                                      }}
                                                      variant="outlined"
                                                      size="small"
                                                      color="error"
                                                    >
                                                      Delete option
                                                    </Button>
                                                  </Box>
                                                </Box>
                                              );
                                            }
                                          )}
                                        </>
                                      );
                                    }

                                    return (
                                      <>
                                        <TextField
                                          size="small"
                                          name={schild}
                                          onChange={(e) =>
                                            handleComponentDataTypeChange(
                                              e,
                                              componentIndex
                                            )
                                          }
                                          value={scComponent.data[schild]}
                                          key={sindex}
                                          label={schild}
                                        />
                                      </>
                                    );
                                  }
                                )}
                              </Stack>

                              <Button
                                size="small"
                                sx={{ mt: 2, textTransform: "none" }}
                                color="primary"
                                disableElevation
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                  handleAddChildComponent(
                                    componentIndex - 1 < 0
                                      ? 0
                                      : componentIndex - 1
                                  )
                                }
                              >
                                Add Above
                              </Button>
                              <Button
                                disableElevation
                                size="small"
                                sx={{ mt: 2, textTransform: "none" }}
                                color="error"
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                  handleAddChildComponent(componentIndex + 1)
                                }
                              >
                                Add Below
                              </Button>
                              <Button
                                size="small"
                                sx={{ mt: 2, textTransform: "none" }}
                                color="error"
                                fullWidth
                                variant="outlined"
                                onClick={() =>
                                  deleteChildComponent(componentIndex)
                                }
                              >
                                Delete component
                              </Button>
                            </Paper>
                          </>
                        );
                      })}
                    </Stack>
                  </>
                )}

                {key === "options" && (
                  <>
                    <Box>
                      <Typography variant="caption">{key}</Typography>
                      {(obj ?? []).map((option, optImdex) => {
                        return (
                          <Box sx={{ my: 2 }} key={optImdex}>
                            <Typography sx={{ mb: 1 }}>
                              {optImdex + 1}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextField
                                  size="small"
                                  fullWidth
                                  label={"Label"}
                                  name="label"
                                  value={option.label}
                                  onChange={(e) =>
                                    handleChangeOption(e, optImdex)
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  size="small"
                                  fullWidth
                                  name="value"
                                  label={"Value"}
                                  value={option.value}
                                  onChange={(e) =>
                                    handleChangeOption(e, optImdex)
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Box>
                              <Button
                                fullWidth
                                onClick={() => handleDeleteOption(optImdex)}
                                sx={{ textTransform: "none", mt: 2 }}
                                variant="outlined"
                                size="small"
                                color="error"
                              >
                                Delete option
                              </Button>
                            </Box>
                          </Box>
                        );
                      })}

                      <Box>
                        <Button
                          fullWidth
                          onClick={() => handleAddOption(0)}
                          sx={{ textTransform: "none" }}
                          variant="outlined"
                        >
                          Add Option
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            );
          }
          if (typeof state?.data[key] === "boolean") {
            return (
              <>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        name={key}
                        onChange={handleCheck}
                        value={state?.data[key]}
                        defaultChecked={state?.data[key]}
                      />
                    }
                    label={key}
                  />
                </FormGroup>
              </>
            );
          }
          return (
            <TextField
              size="small"
              name={key}
              onChange={handleChange}
              value={state?.data[key]}
              key={idx}
              label={key}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export function useActions() {
  const pages = usePagesStateValue("pages");
  const dispatch = usePagesStateValue("dispatch");
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;

  return {
    handleSubmit(state, index) {
      if (index === 0 || index) {
        let allPages = [...pages];
        let page = allPages[pageIndex];
        page.components[index] = { ...state };
        allPages[pageIndex] = page;
        const payload = allPages;
        const key = "pages";
        dispatch({
          type: "update_all",
          payload,
          key,
        });
        return;
      }
      let allPages = [...pages];
      let page = allPages[pageIndex];
      page.components = [...(page.components ?? []), { ...state }];
      allPages[pageIndex] = page;
      const payload = allPages;
      const key = "pages";
      dispatch({
        type: "update_all",
        payload,
        key,
      });
    },
  };
}

var sx = {};

export var components = {
  image: {
    type: "image",
    data: {
      imageUrl: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      height: "100%",
      width: "100%",
      alt: "",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  button: {
    type: "button",
    data: {
      text: "Submit",
      href: "",
      target: "",
      sx: "mt:4",
      type: "button",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
      intents: {
        click: ["nav.delete"],
      },
    },
  },
  form: {
    type: "form",
    data: {
      components: [],
      api: {
        update: false,
        type: "form",
        id: "",
        fields: [],
        procedure: "form",
        buttonText: "Submit",
      },
    },
  },
  text: {
    type: "text",
    data: {
      text: "Hello world",
      variant: "body1",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  box: {
    type: "box",
    data: {
      flex: false,
      centerHorizontal: false,
      centerVertical: false,
      minHeight: "100%",
      components: [],
      api: {
        type: "grid",
        id: "",
        procedure: "map",
        buttonText: "Submit",
        mapType: "",
        mapState: {},
      },
    },
  },
  autocomplete: {
    type: "autocomplete",
    data: {
      label: "Choose OS",
      options: [],
      api: {
        type: "collection",
        id: "",
        procedure: "options",
        label: "Submit",
        labelKey: "",
        valueKey: "",
      },
    },
  },
  buttongroup: {
    type: "buttongroup",
    data: {
      options: [],
      api: {
        type: "collection",
        id: "",
        procedure: "options",
        label: "Submit",
        labelKey: "",
        valueKey: "",
      },
    },
  },
  checkbox: {
    type: "checkbox",
    data: {
      defaultChecked: true,
      label: "Checkbox",
    },
  },
  fab: {
    type: "fab",
    data: {},
  },
  radiogroup: {
    type: "radiogroup",
    label: "Radio group",
    data: {
      options: [],
      api: {
        type: "collection",
        id: "",
        procedure: "options",
        label: "Submit",
        labelKey: "",
        valueKey: "",
      },
    },
  },
  rating: {
    type: "rating",
    data: {
      initialValue: 3,
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  select: {
    type: "select",
    data: {
      label: "Select",
      options: [],
      api: {
        type: "collection",
        id: "",
        procedure: "options",
        label: "Submit",
        labelKey: "",
        valueKey: "",
      },
    },
  },
  slider: {
    type: "slider",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  switch: {
    type: "switch",
    data: {
      defaultChecked: true,
      label: "A switch",
    },
  },
  textfield: {
    type: "textfield",
    data: {
      label: "Textfield",
      type: "text",
      name: "",
      multiline: false,
      rows: 8,
    },
  },
  transferlist: {
    type: "transferlist",
    data: {},
  },
  togglebutton: {
    type: "togglebutton",
    data: {
      options: [],
      api: {
        type: "collection",
        id: "",
        procedure: "options",
        label: "Submit",
        labelKey: "",
        valueKey: "",
      },
    },
  },
  avatar: {
    type: "avatar",
    data: {
      imageUrl: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  badge: {
    type: "badge",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  chip: {
    type: "chip",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  divider: {
    type: "divider",
    data: {},
  },
  list: {
    type: "list",
    data: {
      options: [],
      api: {
        type: "collection",
        id: "",
        procedure: "options",
        label: "Submit",
        labelKey: "",
        valueKey: "",
      },
      intents: {
        click: ["nav.focus", "nav.push./:id"],
      },
    },
  },
  table: {
    type: "table",
    data: {
      api: {
        type: "collection",
        id: "",
        procedure: "table",
        columns: ["Name", "Age"],
      },
    },
  },
  tooltip: {
    type: "tooltip",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  alert: {
    type: "alert",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  backdrop: {
    type: "backdrop",
    data: {},
  },
  dialog: {
    type: "dialog",
    data: {
      buttonText: "Open Dialog",
      components: [],
      actions: [],
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  progress: {
    type: "progress",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  skeleton: {
    type: "skeleton",
    data: {},
  },
  snackbar: {
    type: "snackbar",
    data: {
      actionText: "UNDO",
      autoHideDuration: 6000,
      message: "Note Archived",
      buttonText: "Open Snackbar",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  accordion: {
    type: "accordion",
    data: {},
  },
  appbar: {
    type: "appbar",
    data: {
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  card: {
    type: "card",
    data: {
      imageUrl: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      title: "A sample card",
      body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all ",
      actions: ["share", "learn more"],
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  bottom_navigation: {
    type: "bottom_navigation",
    data: {
      options: [
        { label: "IOS", value: "ios" },
        { label: "Android", value: "android" },
        { label: "Web", value: "web" },
      ],
    },
  },
  breadcrumbs: {
    type: "breadcrumbs",
    data: {},
  },
  drawer: {
    type: "drawer",
    data: {
      position: "left",
      buttonText: "Open drawer",
      options: [
        {
          value: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
          label: "Bed",
        },
        {
          value: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
          label: "Coffee",
        },
      ],
    },
  },
  link: {
    type: "link",
    data: {
      href: "#",
      text: "Link",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
  paypal: {
    type: "paypal",
    data: {},
  },
  menu: {
    type: "menu",
    data: {
      buttonText: "Menu",
      options: [
        {
          value: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
          label: "Bed",
        },
        {
          value: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
          label: "Coffee",
        },
      ],
    },
  },
  pagination: {
    type: "pagination",
    data: {},
  },
  speeddial: {
    type: "speeddial",
    data: {},
  },

  stepper: {
    type: "stepper",
    data: {
      items: [
        {
          label: "Select master blaster campaign settings",
          components: [],
        },
        {
          label: "Create an ad group",
          components: [],
        },
        {
          label: "Create an ad",
          components: [],
        },
      ],
    },
  },
  tabs: {
    type: "tabs",
    data: {
      items: [
        {
          label: "Tab 1",
          components: [],
        },
        {
          label: "Tab 2",
          components: [],
        },
        {
          label: "Tab 3",
          components: [],
        },
      ],
    },
  },
  container: {
    type: "container",
    data: {
      components: [],
      api: {
        type: "grid",
        id: "",
        procedure: "map",
        buttonText: "Submit",
        mapType: "",
        mapState: {},
      },
    },
  },
  grid: {
    type: "grid",
    data: {
      xs: 6,
      lg: 6,
      md: 6,
      spacing: 2,
      components: [],
      api: {
        type: "grid",
        id: "",
        procedure: "map",
        buttonText: "Submit",
        mapType: "",
        mapState: {},
      },
    },
  },
  stack: {
    type: "stack",
    data: {
      spacing: 2,
      direction: "column",
      components: [],
      api: {
        type: "grid",
        id: "",
        procedure: "map",
        buttonText: "Submit",
        mapType: "",
        mapState: {},
      },
    },
  },
  imagelist: {
    type: "imagelist",
    data: {
      height: 600,
      width: 600,
      options: [],
    },
  },
  markdown: {
    type: "markdown",
    data: {
      text: "Markdown text",
      api: {
        type: "item",
        id: "",
        fields: [],
        procedure: "item",
        buttonText: "Submit",
        mapState: {},
      },
    },
  },
};
