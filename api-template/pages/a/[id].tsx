import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

import { Avatar, Box } from "@mui/material";

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
    <Layout>
      <div>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 1 }}>
            <Avatar src={props.image}>{title[0]}</Avatar>
            <h2>{title}</h2>
            <p>By {props?.author?.name || "Unknown author"}</p>
            <ReactMarkdown>{props.description}</ReactMarkdown>
            {!props.published && userHasValidSession && postBelongsToUser && (
              <button onClick={() => Router.push(`/builder/${props.id}`)}>
                Open in builder
              </button>
            )}
            {!props.published && userHasValidSession && postBelongsToUser && (
              <button onClick={() => publishPost(props.id)}>Publish</button>
            )}
            {userHasValidSession && postBelongsToUser && (
              <>
                <button onClick={() => Router.push(`/builder/${props.id}`)}>
                  Open in editor{" "}
                </button>
                <button onClick={() => deletePost(props.id)}>Delete</button>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default App;
