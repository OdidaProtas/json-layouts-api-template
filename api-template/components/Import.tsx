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
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useAxios } from "../hooks/useAxios";
import { useResourceGroupActions } from "../hooks/useResourceGroup";
import ImageField from "./ImageField";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImportDialog({ resourceGroup }) {
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

  return (
    <div>
      <Button
        size="small"
        fullWidth
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Import
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
              Import Collection
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Toolbar />
          <Container sx={{ mb: 6 }}>
            <ImageField
              desc="Click to upload CSV"
              handleChange={() => {}}
              value={null}
            />
            <Button variant="outlined" fullWidth>
              Download Collection CSV Template
            </Button>
          </Container>
        </div>
      </Dialog>
    </div>
  );
}
