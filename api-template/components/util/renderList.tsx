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
import { useSocketEvent } from "../../lib/socket";
import useIntents from "../../hooks/useIntents";
import useDetail from "../../hooks/useRow";

export default function renderList({
  options,
  api = {},
  intents = { click: [] },
}) {
  return <BasicList options={options} api={api} intents={intents} />;
}

function BasicList({ options = [], api, intents = { click: [] } }) {
  const [apiComponents = [], loading, error] = useTransformComponents(api);
  const [socketData, setSockeData] = React.useState([]);
  const intentions = useIntents();
  options = [...socketData, ...options, ...(apiComponents ?? [])];
  useSocketEvent("add_to_collection", (data) => {
    if (data?.id === api?.id) {
      setSockeData((p) => {
        let prev = [...p];
        const row = data.row;
        prev.unshift({
          label: row[api.labelKey],
          isNew: true,
          value: row[api.valueKey],
        });
        return prev;
      });
    }
  });

  function handleClick(id) {
    if (intents?.click?.length) {
      for (let intent of intents.click) {
        const actionArr = intent.split(".");
        if (actionArr[1] === "focus") {
          intentions[actionArr[0]][actionArr[1]](api?.id, id);
        } else if (actionArr[1] === "push") {
          intentions[actionArr[0]][actionArr[1]](actionArr[3]);
        }
      }
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {options.map((option, index) => {
            return (
              <ListItem
                onClick={() => handleClick(option.id)}
                key={index}
                disablePadding
              >
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
