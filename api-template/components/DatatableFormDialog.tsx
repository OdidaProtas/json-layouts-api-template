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
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import { useAxios } from "../hooks/useAxios";
import { useResourceGroupActions } from "../hooks/useResourceGroup";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DatatableFormDialog({ resourceGroup }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [fields, setFields] = React.useState<any>([{ key: "", type: "" }]);

  const handleAddField = () => {
    setFields((p) => [...p, { key: "", type: "text" }]);
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
        Add
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
              Data Table
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Toolbar />
          <Container sx={{ mb: 6 }}>
            <Grid sx={{justfyContent:"center"}} container>
              <Grid item xs={12} md={11} lg={8}>
              <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <div></div>
                <TextField
                  label="Name"
                  name="name"
                  size="small"
                  required
                  onChange={handleChange}
                  value={state.name}
                />
                <TextField
                  multiline
                  name="description"
                  rows={5}
                  size="small"
                  label="Description"
                  onChange={handleChange}
                  value={state.description}
                />
                <Typography variant="h5">Fields</Typography>
                <Box>
                  <Container>
                    <Stack spacing={2}>
                      {fields.map((field, index) => {
                        return (
                          <Paper sx={{ p: 2 }} key={index}>
                            <Box sx={{ display: "flex", my: 2 }}>
                              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                {index + 1}.
                              </Typography>
                              <Button
                                onClick={() => handleRemoveField(index)}
                                size="small"
                                variant="outlined"
                              >
                                Remove
                              </Button>
                            </Box>
                            <TextField
                              value={field.key}
                              required
                              size="small"
                              onChange={(e) => handleFieldChange(e, index)}
                              name="key"
                              label="Field name"
                              fullWidth
                            />
                            <FormControl sx={{ mt: 2 }} size="small" fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Field type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field.type}
                                name="type"
                                label="Field type"
                                onChange={(e) => handleFieldChange(e, index)}
                              >
                                <MenuItem value={"text"}>Text</MenuItem>
                                <MenuItem value={"email"}>Email</MenuItem>
                                <MenuItem value={"number"}>Number</MenuItem>
                                <MenuItem value={"password"}>Password</MenuItem>
                                <MenuItem disabled value={"markdown"}>
                                  markdown
                                </MenuItem>
                                <MenuItem disabled value={"richtext"}>
                                  richtext
                                </MenuItem>
                                <MenuItem value={"multiline"}>
                                  Multiline
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Paper>
                        );
                      })}
                      <Button onClick={handleAddField} variant="outlined">
                        Add field
                      </Button>
                    </Stack>
                  </Container>
                </Box>
                <Button
                  type="submit"
                  disabled={saving}
                  disableElevation
                  variant="contained"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </Stack>
            </form>
              </Grid>
            </Grid>
           
          </Container>
        </div>
      </Dialog>
    </div>
  );
}
