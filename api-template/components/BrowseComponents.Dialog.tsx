import * as React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Paper } from "@mui/material";
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

export default function BrowseComponents({
  toggleBrowse = (v) => {},
  select = (v) => {},
}: any) {
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
  // const [i'sPending, startTransition] = React.useTransition();

  // const _renders = React.useMemo(() => {
  //   return Object.keys(components).map((cmp, index) => {
  //     const component = components[cmp];
  //     return (
  //       <Box key={index}>
  //         <Paper
  //           elevation={0}
  //           sx={{
  //             height: "100%",
  //             p: 2,
  //             elevation: 0,
  //             position: "relative",
  //           }}
  //         >
  //           <Typography variant="h5"> {component?.type}</Typography>
  //           <Divider sx={{ my: 3 }} />
  //           {renderComponents([{ ...component }])}
  //           <Divider sx={{ my: 3 }} />
  //           <Code size="small" state={{ ...component }} />
  //           <Divider sx={{ my: 3 }} />
  //           <Button
  //             fullWidth
  //             variant="outlined"
  //             sx={{ mt: 2, textTransform: "none" }}
  //             size="small"
  //             onClick={(e) => handleCopy(JSON.stringify({ ...component }))}
  //           >
  //             Copy JSON
  //           </Button>
  //           <Button
  //             fullWidth
  //             variant="outlined"
  //             sx={{ mt: 2, textTransform: "none" }}
  //             size="small"
  //             onClick={(e) => handleSelect({ ...component })}
  //           >
  //             Use component
  //           </Button>
  //         </Paper>
  //       </Box>
  //     );
  //   });
  // }, []);

  return (
    <div>
      {/* <Button
        sx={{ my: 2, textTransform: "none" }}
        size="small"
        fullWidth
        variant="outlined"
        onClick={toggleBrowse}
      >
        Browse components
      </Button> */}
      {/* <div>{_renders}</div> */}
    </div>
  );
}


