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
import { Box, Container } from "@mui/material";
import { useAxios } from "../hooks/useAxios";
import { useResourceGroupActions } from "../hooks/useResourceGroup";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExportDialog({ resourceGroup }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [fields, setFields] = React.useState([{ key: "" }]);

  const handleAddField = () => {
    setFields((p) => [...p, { key: "" }]);
  };

  const handleRemoveField = (index) => {
    setFields((p) => {
      let all = [...p];
      all.splice(index, 1);
      return all;
    });
  };

  const handleFieldChange = (e, index) => {
    const { value, name } = e.target;
    setFields((p) => {
      let all = [...p];
      all[index] = { ...p[index], [name]: value };
      return all;
    });
  };

  const [state, setState] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((p) => ({ ...p, [name]: value }));
  };

  const axios = useAxios();

  const [saving, setSaving] = React.useState(false);

  const { updateTables } = useResourceGroupActions();

  const handleSubmit = async (e) => {
    setSaving(true);
    try {
      e.preventDefault();
      const res = await axios.post("/api/resource/data/tables", {
        ...state,
        fields,
        resourceGroupId: resourceGroup?.id,
      });
      if (res.data) {
        updateTables(res.data);
        setSaving(false);
        setOpen(false);
      }
    } catch (e) {
      setSaving(false);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        size="small"
        fullWidth
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Export
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
              Export Collection
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Toolbar />
          <Container sx={{ mb: 6 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                aria-label="basic tabs example"
              >
                <Tab label="CSV" {...a11yProps(0)} />
                <Tab label="FORM" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              CSV
            </TabPanel>
            <TabPanel value={value} index={1}>
              FORM
            </TabPanel>
          </Container>
        </div>
      </Dialog>
    </div>
  );
}
