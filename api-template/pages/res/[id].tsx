import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";
import { Container, Grid, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const app = await prisma.app.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            resourceGroups: {
                select: { name: true, id: true },
            },
        } as any,
    });
    return {
        props: app,
    };
};

const App: React.FC<any> = (props) => {
    const router = useRouter()
    return (
        <Layout>
            <div className="page">
                <h1>{props.drafts.length} Drafts</h1>
                <Container>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid spacing={2} container>
                                {props.app.resourceGroups.map((app) => (
                                    <Grid item lg={4} md={6} xs={12} key={app.id}>
                                        <div className="post">
                                            ',;,l m'
                                            {/* <App app={app} /> */}
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                            {!Boolean(props.app.resourceGroups.length) && (
                                <div>
                                    <h6>You do not have any draft applications</h6>
                                    <Button
                                        variant={"outlined"}
                                        onClick={() => router.push("/create")}
                                    >
                                        Create app
                                    </Button>
                                </div>
                            )}
                        </Box>
                    </Box>
                </Container>
            </div>
            <style jsx>{`
            .post {
              background: var(--geist-background);
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

export default App;
