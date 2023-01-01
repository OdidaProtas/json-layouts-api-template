import React from "react";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

import Preview from "../../components/Preview";
import { AuthSpinner } from "..";
import Layout from "../../components/Layout";
import useApp from "../../hooks/useApp";
import { usePagesStateValue } from "../../lib/builder";

const App: React.FC<AppProps> = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const props = useApp({ id: router.query.id });

  const loadingData = usePagesStateValue("loaders.apps");

  if (status === "loading" || loadingData) {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>Preview</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  let title = props.name;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  if (true) {
    return <Preview fullScreen />;
  }
};

export default App;
