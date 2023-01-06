// pages/p/[id].tsx

import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import Preview from "../../components/Preview";
import BuilderTabs from "../../components/BuilderTabs";

import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "../../lib/defaultheme";
import ToggleButtons from "../../components/ToggleButtons";
import { AuthSpinner } from "..";
import useApp from "../../hooks/useApp";
import { usePagesStateValue } from "../../lib/builder";
import Layout from "../../components/Layout";
import BuilderLayout from "../../components/BuilderLayout";

const App: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const app = useApp();
  const props = app ?? {}; // to ref
  const loadingApp = usePagesStateValue("loaders.apps");

  if (status === "loading" || loadingApp) {
    return <AuthSpinner />;
  }

  // if (!session) {
  //   return (
  //     <Layout>
  //       <h1>Drafts</h1>
  //       <div>You need to be authenticated to view this page.</div>
  //     </Layout>
  //   );
  // }
  let title = props?.name;
  if (!props?.published) {
    title = `${title} (Draft)`;
  }

  return (
    <BuilderLayout>
      <Grid container>
        <Grid item xs={8}>
          <Paper
            sx={{
              bgcolor: "lightgray",
              minHeight: "85vh",
              p: 3,
              overflow: "auto",
            }}
          >
            

            <ThemeProvider theme={defaultTheme}>
              <Preview />
            </ThemeProvider>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <BuilderTabs />
        </Grid>
      </Grid>
    </BuilderLayout>
  );
};

export default App;
