import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ComponentForm, {
  components,
  ComponentSelect,
  useActions,
} from "./ComponentForm";
import dynamic from "next/dynamic";
import renderComponents from "./util/renderComponents";
import { Button } from "@mui/material";
import ResourceFormDialog from "./ResourceFormDialog";

const Code = dynamic(import("./Code"), {
  ssr: false,
});

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

interface ICFTabs {
  data?: any;
  index?: number;
  toggleBrowse?: Function;
}

export default function ComponentFormTabs({
  data,
  index: cIndex,
  toggleBrowse = ()=>{},
}: ICFTabs ) {
  const [value, setValue] = React.useState(0);

  const _handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [type, setType] = React.useState(data?.type ?? "text");

  const [state, setState] = React.useState(() => {
    if (data) return { ...data };
    return components[type];
  });

  const { handleSubmit } = useActions();

  const handleTypeChange = ({ value }) => {
    setState(components[value]);
    setType(value);
  };

  const handleChange = (e) => {
    setState((s) => ({
      ...s,
      data: { ...s.data, [e.target.name]: e.target.value },
    }));
  };
  const handleCheck = (e) => {
    setState((s) => ({
      ...s,
      data: { ...s.data, [e.target.name]: e.target.checked },
    }));
  };

  const handleComponentTypeChange = ({ value }, index) => {
    setState((s) => {
      let allComponents = [...s.data.components];
      allComponents[index] = components[value];
      return { ...s, data: { ...s.data, components: allComponents } };
    });
  };

  const handleComponentDataTypeChange = (
    e,
    index,
    { check } = { check: false }
  ) => {
    setState((s) => {
      let allComponents = [...s.data.components];
      allComponents[index].data = {
        ...allComponents[index].data,
        [e.target.name]: check ? e.target.checked : e.target.value,
      };
      return { ...s, data: { ...s.data, components: allComponents } };
    });
  };

  const deleteChildComponent = (index) => {
    setState((s) => {
      let allComponents = [...s.data.components];
      allComponents.splice(index, 1);
      return { ...s, data: { ...s.data, components: allComponents } };
    });
  };

  const handleAddChildComponent = (childIndex) => {
    setState((s) => {
      let allComponents = [...s.data.components];
      allComponents.splice(childIndex, 0, { ...components["text"] });
      return { ...s, data: { ...s.data, components: allComponents } };
    });
  };

  const handleChangeOption = (e, index) => {
    setState((s) => {
      let allComponents = [...s.data.options];
      allComponents[index] = {
        ...allComponents[index],
        [e.target.name]: e.target.value,
      };
      return { ...s, data: { ...s.data, options: allComponents } };
    });
  };

  const handleAddOption = (newIndex) => {
    setState((s) => {
      let allComponents = [...s.data.options];
      allComponents.splice(newIndex, 0, { label: "", value: "" });
      return { ...s, data: { ...s.data, options: allComponents } };
    });
  };
  const handleDeleteOption = (index) => {
    setState((s) => {
      let allComponents = [...s.data.options];
      allComponents.splice(index, 1);
      return { ...s, data: { ...s.data, options: allComponents } };
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={_handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ textTransform: "none" }} label="Form" {...a11yProps(0)} />
          <Tab sx={{ textTransform: "none" }} label="JSON" {...a11yProps(1)} />
          <Tab
            sx={{ textTransform: "none" }}
            label="Preview"
            {...a11yProps(2)}
          />
          {/* <Tab
            sx={{ textTransform: "none" }}
            label="Resources"
            {...a11yProps(3)}
          /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ComponentSelect toggleBrowse={toggleBrowse}  onChange={handleTypeChange} value={state.type} />
        <ResourceFormDialog type={state.type} />
        <ComponentForm
          handleTypeChange={handleTypeChange}
          data={{ ...state }}
          index={cIndex}
          type={type}
          handleComponentTypeChange={handleComponentTypeChange}
          handleComponentDataTypeChange={handleComponentDataTypeChange}
          deleteChildComponent={deleteChildComponent}
          handleCheck={handleCheck}
          handleChange={handleChange}
          handleChangeOption={handleChangeOption}
          handleAddOption={handleAddOption}
          handleDeleteOption={handleDeleteOption}
          handleAddChildComponent={handleAddChildComponent}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <ComponentSelect toggleBrowse={toggleBrowse}  onChange={handleTypeChange} value={state.type} /> */}
        {/* <ResourceFormDialog type={state.type} /> */}
        <Code size="small" state={{ ...state }} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <ComponentSelect toggleBrowse={toggleBrowse}  onChange={handleTypeChange} value={state.type} /> */}
        {/* <ResourceFormDialog type={state.type} /> */}
        {renderComponents([{ ...state }])}
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <div style={{ justifyItems: "space-evenly" }}>
          <ResourceFormDialog />
          <ComponentSelect onChange={handleTypeChange} value={state.type} />
          <p>
            There are no resources associated with this resource. Resources can
            be data tables, forms or other data sources including webhooks and
            external datasources that the component relies on.
          </p>
        </div>
      </TabPanel> */}
      <Button
        fullWidth
        sx={{ mt: 3 }}
        disableElevation
        onClick={(e) => handleSubmit({ ...state }, cIndex)}
        variant="contained"
        color="secondary"
      >
        {cIndex ? "Update" : cIndex === 0 ? "Update" : "Add"}
      </Button>
    </Box>
  );
}
