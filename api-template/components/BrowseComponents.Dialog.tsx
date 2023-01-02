import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import NewPageForm from "./NewPageForm";
import { Box, Container, Grid, Paper } from "@mui/material";
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

export default function BrowseComponents({ select = (v) => { } }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleCopy(text) {
    navigator.clipboard.writeText(text).then(
      function () {
        alert("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  function handleSelect(text) {
    select({ value: text.type });
    setOpen(false);
  }

  return (
    <div>
      <Button
        sx={{ my: 2, textTransform: "none" }}
        size="small"
        fullWidth
        variant="outlined"
        onClick={handleClickOpen}
      >
        Browse components
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
              Components
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ backgroundColor: "lightgray" }}>
          <Toolbar />
          <Container sx={{ pt: 4 }}>
            <Grid container spacing={2}>
              {Object.keys(components).map((cmp, index) => {
                const component = components[cmp];
                return (
                  <Grid item xs={4} key={index}>
                    <Paper
                      elevation={0}
                      sx={{ height: "100%", p: 2, elevation: 0, position: "relative" }}
                    >
                      <Typography variant="h5"> {component?.type}</Typography>
                      <Divider sx={{ my: 3 }} />
                      {renderComponents([{ ...component }])}
                      <Divider sx={{ my: 3 }} />
                      <Code size="small" state={{ ...component }} />
                      <Divider sx={{ my: 3 }} />
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2, textTransform: "none" }}
                        size="small"
                        onClick={(e) =>
                          handleCopy(JSON.stringify({ ...component }))
                        }
                      >
                        Copy JSON
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2, textTransform: "none" }}
                        size="small"
                        onClick={(e) => handleSelect({ ...component })}
                      >
                        Use component
                      </Button>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      </Dialog>
    </div>
  );
}
