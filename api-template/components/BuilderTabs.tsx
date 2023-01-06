import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Themes from "./Themes";
import ComponentsTab from "./PageComponents";
import Pages from "./Pages";
import Preferences from "./Preferences";

import dynamic from "next/dynamic";
import ComponentForm from "./ComponentForm";
import ComponentFormTabs from "./ComponenentFormTabs";
import defaultTheme from "../lib/defaultheme";
import AddPage from "./AddPageDialog";
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

  return (
    <Box sx={{ width: "90%", overflow: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          scrollButtons
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ textTransform: "none" }}
            label="Components"
            {...a11yProps(0)}
          />
          <Tab sx={{ textTransform: "none" }} label="JSON" {...a11yProps(1)} />
          <Tab
            sx={{ textTransform: "none" }}
            label="Components"
            {...a11yProps(2)}
          />
          <Tab sx={{ textTransform: "none" }} label="Theme" {...a11yProps(3)} />
          <Tab sx={{ textTransform: "none" }} label="Pages" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ComponentFormTabs />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Code />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ComponentsTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Code state={{ ...defaultTheme }} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AddPage />
      </TabPanel>
    </Box>
  );
}
