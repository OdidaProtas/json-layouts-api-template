import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import useTransformComponents from "../../hooks/useTransformComponents";
import { LinearProgress } from "@mui/material";

export default function renderList({ options, api = {} }) {
  return <BasicList options={options} api={api} />;
}

function BasicList({ options = [], api }) {
  const [apiComponents = [], loading, error] = useTransformComponents(api);
  options = [...options, ...(apiComponents ?? [])];
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {options.map((option, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {loading && <LinearProgress />}
      </nav>
    </Box>
  );
}
