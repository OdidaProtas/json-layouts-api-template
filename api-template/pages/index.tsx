import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import App, { AppProps } from "../components/App";

import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Box } from "@mui/material";

export const getStaticProps: GetStaticProps = async () => {
  const apps = await prisma.app.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { apps },
    revalidate: 10,
  };
};

type Props = {
  apps: AppProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const hasApps = Boolean(props.apps.length);
  return (
    <Layout>
      <div className="page">
        {userHasValidSession && <h1>Your apps</h1>}
        {!userHasValidSession && (
          <p>You need to be signed in to view your apps</p>
        )}
        <main>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {userHasValidSession && (
                  <>
                    {props.apps.map((app) => (
                      <div key={app.id} className="post">
                        <App app={app} />
                      </div>
                    ))}
                  </>
                )}

                {!hasApps && userHasValidSession && (
                  <div>
                    <h6>You do not have any published apps</h6>
                    <button onClick={() => router.push("/create")}>
                      Create app
                    </button>
                    <button onClick={() => router.push("/drafts")}>
                      Go to drafts
                    </button>
                  </div>
                )}
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
          </Box>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
