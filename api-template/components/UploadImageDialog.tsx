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
import { Container, Divider, Paper, Stack, Tooltip } from "@mui/material";
import ImageField from "./ImageField";
import useUpload from "../hooks/useUpload";
import { useRouter } from "next/router";
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

export default function UploadImageDialog({ resourceGroup }) {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState([]);

  const [uploading, setUploading] = React.useState(false);
  const uploadImages = useUpload();

  const axios = useAxios();
  const resourceGroupId = resourceGroup.id;

  const { updateImages } = useResourceGroupActions();

  async function handleUpload() {
    try {
      setUploading(true);
      const uploads = await uploadImages(
        values.map((val, i) => ({ fileData: val, field: i }))
      );
      if ((uploads as any).length) {
        setUploading(false);
        const images = (uploads as any).map(({ url }) => ({
          url,
          resourceGroupId,
        }));
        const imagesRes = await axios.post(`/api/resource/data/images`, images);
        const imageData = imagesRes.data;
        if (imageData) {
          updateImages([...imagesRes.data]);
          setUploading(false);
          setOpen(false);
        }
      }
    } catch (e) {
      setUploading(false);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        size="small"
        fullWidth
        variant="outlined"
        onClick={handleClickOpen}
      >
        Upload Images / Media
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
              Media
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Toolbar />
          <ImageField
            handleChange={setValues}
            value={values}
            multiple
            desc="Drag and drop images, or click to upload"
          />
          <Button
            disabled={!values.length || uploading}
            sx={{ textTransform: "none" }}
            disableElevation
            fullWidth
            onClick={handleUpload}
            variant="contained"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Container>
      </Dialog>
    </div>
  );
}
