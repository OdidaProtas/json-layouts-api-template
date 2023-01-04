import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AddCircle, Apps, Home } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Link from "next/link";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: session } = useSession();

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Box sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
          <Link href="/about-us">
            <Typography sx={{ minWidth: 100 }}>About us</Typography>
          </Link>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
          <Link href="/templates">
            <Typography sx={{ minWidth: 100 }}>Templates</Typography>
          </Link>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
          <Link href="https://docs.dreamfeel.me">
            <Typography sx={{ minWidth: 100 }}>Documentation</Typography>
          </Link>
        </Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={session?.user?.image} sx={{ width: 32, height: 32 }}>
              {session?.user?.name[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar src={session?.user?.image} />
          <div>
            <Typography variant="h6">{session?.user?.name}</Typography>
            <Typography>{session?.user?.email}</Typography>
          </div>
        </MenuItem>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={() => router.push("/")}>
          <ListItemIcon>
            <Home fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={() => router.push("/m")}>
          <ListItemIcon>
            <Apps fontSize="small" />
          </ListItemIcon>
          My apps
        </MenuItem>
        <MenuItem onClick={() => router.push("/create")}>
          <ListItemIcon>
            <AddCircle fontSize="small" />
          </ListItemIcon>
          Create a new app
        </MenuItem>
        <MenuItem onClick={() => router.push("/plans")}>
          <ListItemIcon>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          Plans and Billing
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/admin");
          }}
        >
          <ListItemIcon>
            <AdminPanelSettingsIcon fontSize="small" />
          </ListItemIcon>
          Admin Panel
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
