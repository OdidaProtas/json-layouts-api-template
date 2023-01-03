import { Box } from "@mui/material";
import { usePagesStateValue } from "../../lib/builder";
import renderPage from "./renderPage";

export default function RenderApp({ subdomainData }) {
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const { draft = "[]" } = subdomainData;
  const pages = JSON.parse(draft);
  const page = pages[pageIndex];
  return <Box>{renderPage(page)}</Box>;
}
