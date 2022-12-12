// pages/p/[id].tsx

import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { Grid, Paper, Typography } from "@mui/material";
import Preview from "../../components/Preview";
import BuilderTabs from "../../components/BuilderTabs";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.app.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/app/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const App: React.FC<AppProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.name;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Grid container>
      <Grid item xs={8}>
        <Paper
          sx={{
            bgcolor: "lightgray",
            minHeight: "60vh",
            p: 3,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Preview />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <BuilderTabs />
      </Grid>
    </Grid>
  );
};

export default App;
