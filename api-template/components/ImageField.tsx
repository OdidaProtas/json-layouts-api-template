import { Box, Divider, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export interface IImageFied {
  desc: string;
  value: any;
  handleChange: Function;
  multiple?: boolean;
}

export default function ImageField({
  desc,
  value,
  handleChange,
  multiple = false,
}: IImageFied) {
  const [image, setImage] = React.useState<string>("");
  const [images, setImages] = React.useState([]);

  const onDrop = React.useCallback(
    (acceptedFiles: any) => {
      handleChange(acceptedFiles);
    },
    [handleChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: multiple ? 20 : 1,
  });
  const { ref, ...rootProps } = getRootProps();

  useEffect(() => {
    if (value && !multiple) {
      if (typeof value === "string") {
        const reader = new FileReader();
        reader.onload = function (e) {
          setImage((e as any).target.result as any);
        };
        try {
          reader.readAsDataURL(value as any);
        } catch (e) {}
      }
    }
    if (value?.length && multiple) {
      for (let val of value) {
        const reader = new FileReader();
        reader.onload = function (e) {
          setImages((p) => [...p, (e as any).target.result as any]);
        };
        try {
          reader.readAsDataURL(val as any);
        } catch (e) {}
      }
    }
  }, [value]);

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.newWhite",
      }}
      {...rootProps}
    >
      <Box>
        {Boolean(image) && !multiple && (
          <Box>
            <img height={144} src={image} alt="Uploaded Image" />
            <Divider />
          </Box>
        )}
        {Boolean(images.length) && multiple && (
          <Box onClick={(e) => e.stopPropagation()} sx={{ width: 650, mt: 3 }}>
            <Carousel autoPlay>
              {images.map((app, index) => {
                return (
                  <div key={index}>
                    <img style={{ borderRadius: "4px" }} src={app} />
                  </div>
                );
              })}
            </Carousel>
          </Box>
        )}
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop files here" : desc}</p>
      </Box>
    </Paper>
  );
}
