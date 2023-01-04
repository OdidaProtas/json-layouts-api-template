import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "../../../components/Layout";
import ResourceTabs from "../../../components/ResourceTabs";
import useResourceGroup from "../../../hooks/useResourceGroup";
import { usePagesStateValue } from "../../../lib/builder";
import { AuthSpinner } from "../..";
import ResDash from "../../../components/ResouceLayout";

const App: React.FC = () => {
  const props = useResourceGroup();
  const loading = usePagesStateValue("loaders.resourceGroup");
  if (loading) return <AuthSpinner />;
  return (
    <ResDash isDetail>
      <Container>
        <Typography variant="h4">Resources</Typography>
        <ResourceTabs resourceGroup={{ ...props }} />
      </Container>
    </ResDash>
  );
};

export default App;
