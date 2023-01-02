import React from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

import Edit from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";

export type AppProps = {
  id: string;
  name: string;
  author: {
    image: string;
    name: string;
    email: string;
  } | null;
  description: string;
  published: boolean;
  image: string;
  meta: string;
  favicon: string;
  password: string;
  passwordProtectionMessage: string;
  draft: string;
  title: string;
  isNew: boolean;
};

const App: React.FC<{ app: AppProps; noStatus?: boolean; height?: number }> = ({
  app,
  noStatus = false,
  height,
}) => {
  const authorName = app.author ? app.author.name : "Unknown author";
  const { data: session, status } = useSession();
  return (
    <div onClick={() => Router.push("/[id]", `/${app.id}`)}>
      {!noStatus && (
        <Chip
          color={app.published ? "success" : "primary"}
          size="small"
          sx={{ mb: 1 }}
          label={
            app.published
              ? `${app.isNew ? "Live (New)" : "Live"}`
              : `${app.isNew ? "Draft (New)" : "Draft"}`
          }
        />
      )}

      <img
        height={height ? height : "80"}
        width="100%"
        style={{ borderRadius: "50%" }}
        alt={app.name}
        src={app.image}
      />
      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography variant="caption">{app.name}</Typography>
      </Box>
      <Box>
        <Box>
          {session?.user?.email === app?.author.email && !noStatus && (
            <Button
              size="small"
              fullWidth
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                Router.push("/a/[id]", `/a/${app.id}`);
              }}
            >
              <Settings />
            </Button>
          )}
        </Box>
      </Box>
      <style jsx>{`
        div {
          color: inherit;
          padding: 1em;
        }
      `}</style>
    </div>
  );
};

export default App;
