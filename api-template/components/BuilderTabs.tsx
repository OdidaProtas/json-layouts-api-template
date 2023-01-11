import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ComponentsTab from "./PageComponents";
import dynamic from "next/dynamic";
import { usePagesStateValue } from "../lib/builder";
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

export default function BuilderTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = usePagesStateValue("theme");

  const { handleThemeChange } = useCodeActions();

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          scrollButtons
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {/* <Tab
            sx={{ textTransform: "none" }}
            label="Components"
            {...a11yProps(0)}
          /> */}
          <Tab
            sx={{ textTransform: "none" }}
            label="Components"
            {...a11yProps(0)}
          />
          <Tab sx={{ textTransform: "none" }} label="JSON" {...a11yProps(1)} />
          <Tab sx={{ textTransform: "none" }} label="Theme" {...a11yProps(2)} />
          {/* <Tab sx={{ textTransform: "none" }} label="Pages" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        <ComponentFormTabs />
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <ComponentsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Code />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Code  theme state={{ theme }} />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <AddPage />
      </TabPanel> */}
    </Box>
  );
}

export function useCodeActions() {
  const dispatch = usePagesStateValue("dispatch");
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const pages = usePagesStateValue("pages");

  return {
    handleChange(codeString) {
      const type = "update_all";
      let allPages = [...pages];
      try {
        allPages[pageIndex] = JSON.parse(codeString);
      } catch (e) {}
      dispatch({
        type: type,
        payload: allPages,
        key: "pages",
      });
    },
    handleThemeChange(theme) {
      const type = "update_all";
      try {
        dispatch({
          type: type,
          payload: theme,
          key: "theme",
        });
      } catch (e) {}
    },
  };
}
