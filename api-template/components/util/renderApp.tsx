import { createTheme, ThemeProvider } from "@mui/material";
import { usePagesStateValue } from "../../lib/builder";
import renderPage from "./renderPage";
import Head from "next/head";

export default function RenderApp({ subdomainData }) {
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const pages = JSON.parse(subdomainData?.draft ?? "[]");
  const page = pages[pageIndex];
  const theme = usePagesStateValue("theme");
  const muiTheme = createTheme(theme);
  return (
    <ThemeProvider theme={muiTheme}>
      <Head>
        <title>{subdomainData.name ?? "DREAMFEEL SPACES"}</title>
      </Head>
      {renderPage(page)}
    </ThemeProvider>
  );
}
