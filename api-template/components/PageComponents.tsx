import { Box, Divider } from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import CompontentsAccordion from "./ComponentAccordion";

export default function ComponentsTab() {
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const pages = usePagesStateValue("pages")[pageIndex];
  const componentsData = pages?.components ?? [];
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "lightblue",
        maxHeight: "69vh",
        borderRadius: "4px",
        overflow: "auto",
      }}
    >
      {!componentsData.length && (
        <Box>
          This page has no components
        </Box>
      )}
      {componentsData.map((component: any, index: number) => {
        return (
          <>
            <CompontentsAccordion
              key={index}
              index={index}
              component={component}
            />
            <Divider sx={{ my: 2 }} />
          </>
        );
      })}
    </Box>
  );
}
