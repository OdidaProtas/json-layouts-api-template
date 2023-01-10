import React from "react";

import { AppProps } from "../components/App";
import renderPage from "../components/util/renderPage";
import { usePagesStateValue } from "../lib/builder";
import helloWorld from "../lib/defaultApp";
import { useRouter } from "next/router";
import usePages from "../hooks/usePages";
import { AuthSpinner } from ".";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import useApps from "../hooks/useApps";
import Preview from "../components/Preview";

const App: React.FC<AppProps> = () => {
  const router = useRouter();
  const pages = usePages();
  const loading = usePagesStateValue("loaders.pages");
  const theme = usePagesStateValue("theme");
  const { status: authStatus } = useSession();

  const pageIndex = usePagesStateValue("pageIndex", 0);
  const pageData = pages[pageIndex];

  if (loading || authStatus === "loading") {
    return <AuthSpinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      {renderPage(pageData ?? { ...helloWorld })}
    </ThemeProvider>
  );
};

export default App;
