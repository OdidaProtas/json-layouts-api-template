import {
  Box,
  Button,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import usePages from "../hooks/usePages";
import { usePagesStateValue } from "../lib/builder";
import defaultTheme from "../lib/defaultheme";
import AddPage from "./AddPageDialog";
import { ErrorBoundary } from "./ErrorBoundary";
import renderPage from "./util/renderPage";

export default function Preview({ fullScreen = false }) {
  const pages = usePages();
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  const pageData = pages[pageIndex];
  const loader = usePagesStateValue("loaders.pages");
  const theme = usePagesStateValue("theme");
  if (!pageData)
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxHeight: `${fullScreen ? "100%" : "76vh"}`,
          minHeight: `${fullScreen ? "100%" : "76vh"}`,
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No page data found
      </Paper>
    );
  if (fullScreen) {
    return (
      <ThemeProvider theme={theme}>{renderPage(pageData)}</ThemeProvider>
    );
  }
  return (
    <Paper
      elevation={0}
      sx={{
        p: fullScreen ? 0 : 2,
        maxHeight: `${fullScreen ? "100%" : "55vh"}`,
        minHeight: `${fullScreen ? "100%" : "50vh"}`,
        overflow: "auto",
        position: "relative",
      }}
    >
      <ErrorBoundary>{renderPage(pageData)}</ErrorBoundary>
    </Paper>
  );
}
