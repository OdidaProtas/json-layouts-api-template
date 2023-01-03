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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import useResourceGroups from "../hooks/useResourceGroups";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import UploadImageDialog from "./UploadImageDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResourceFormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resourceGroups = useResourceGroups();

  console.log(resourceGroups);

  return (
    <div>
      <Button
        size="small"
        fullWidth
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add / Link resources
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
            <Stack spacing={3}>
              <Toolbar />
              {resourceGroups?.map((res) => {
                return (
                  <Accordion key={res.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>{res.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <BasicTabs res={res} />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
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

function BasicTabs({ res }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const images = res.images ?? [];
  const tables = res.tables ?? [];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Images" {...a11yProps(0)} />
          <Tab label="Tables" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <UploadImageDialog resourceGroup={res} />
            </Box>
          </Box>
          {images.map((image) => {
            return (
              <Grid key={image.id} item xs>
                <Paper sx={{ p: 2 }}>
                  <img src={image.url} alt="Image" />
                </Paper>
              </Grid>
            );
          })}
          {!Boolean(images.length) && (
            <Grid item xs={12}>
              No images have been added
            </Grid>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <UploadImageDialog resourceGroup={res} />
            </Box>
          </Box>
          {tables.map((table) => {
            return (
              <Grid key={table.id} item xs>
                <Paper sx={{ p: 2 }}>
                  <Typography>{table.name}</Typography>
                  {/* <img src={image.url} alt="Image" /> */}
                </Paper>
              </Grid>
            );
          })}
          {!Boolean(tables.length) && (
            <Grid item xs={12}>
              No tables have been added
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}
