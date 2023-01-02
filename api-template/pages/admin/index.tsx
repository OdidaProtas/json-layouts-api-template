import { List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import Dash from "../../components/DashboardLayout";

export default function DashHome() {
  const router = useRouter();
  return (
    <Dash>
      {/* <List>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText onCli primary="Add Category" />
        </ListItemButton>
      </List> */}
      Admin panel overview
    </Dash>
  );
}
