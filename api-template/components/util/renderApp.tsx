import { Box } from "@mui/material";
import { usePagesStateValue } from "../../lib/builder";
import renderPage from "./renderPage";
import Head from "next/head";

export default function RenderApp({ subdomainData }) {
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const { draft = "[]" } = subdomainData;
  const pages = JSON.parse(draft);
  const page = pages[pageIndex];
  return (
    <Box>
      <Head>
        <title>{subdomainData.name ?? "DREAMFEEL SPACES"}</title>
      </Head>
      {renderPage(page)}
    </Box>
  );
}
