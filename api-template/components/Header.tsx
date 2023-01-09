// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Chip, Button, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { Home, Login, Store } from "@mui/icons-material";
import AccountMenu from "./AccountMenu";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <div className="logo">
        {/* <Typography variant="h5">DREAMVILLE</Typography> */}
      </div>
      <Link href="/">
        <a
          style={{ textDecoration: "none" }}
          className="bold"
          data-active={isActive("/")}
        >
          <Chip sx={{ cursor: "pointer" }} icon={<Home />} label="Home" />
        </a>
      </Link>
      <a
        style={{ textDecoration: "none" }}
        className="bold"
        target={"blank"}
        href={`https://marketplace.dreamfeel.me`}
      >
        <Typography sx={{ ml: 1, display: "inline" }}>Marketplace</Typography>
      </a>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <div className="logo">
          {/* <Typography variant="h5">DREAMVILLE</Typography> */}
        </div>
        <Link href="/">
          <a
            style={{ textDecoration: "none" }}
            className="bold"
            data-active={isActive("/")}
          >
            <Chip sx={{ cursor: "pointer" }} icon={<Home />} label="Home" />
          </a>
        </Link>
        <a
          style={{ textDecoration: "none" }}
          className="bold"
          target={"blank"}
          href={`https://marketplace.dreamfeel.me`}
        >
          <Typography sx={{ ml: 1, display: "inline" }}>Marketplace</Typography>
        </a>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right" style={{ display: "flex" }}>
        <Link href="/about-us">
          <Typography
            sx={{ mr: 2, display: { xs: "none", md: "block", lg: "block" } }}
          >
            About us
          </Typography>
        </Link>
        <Box sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
          <Link href="/templates">
            <Typography sx={{ minWidth: 100 }}>Templates</Typography>
          </Link>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block", lg: "block", mr: 2 } }}>
          <Link href="https://docs.dreamfeel.me">
            <Typography sx={{ minWidth: 100 }}>Documentation</Typography>
          </Link>
        </Box>
        <Link href="/api/auth/signin">
          <Button
            size="small"
            sx={{ textTransform: "none", ml: 2 }}
            disableElevation
            variant="outlined"
            startIcon={<Login />}
            data-active={isActive("/signup")}
          >
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <div className="logo">
          {/* <Typography variant="h5">DREAMVILLE</Typography> */}
        </div>
        <Link href="/">
          <a
            style={{ textDecoration: "none" }}
            className="bold"
            data-active={isActive("/")}
          >
            <Chip sx={{ cursor: "pointer" }} icon={<Home />} label="Home" />
          </a>
        </Link>
        <a
          style={{ textDecoration: "none" }}
          className="bold"
          target={"blank"}
          href={`https://marketplace.dreamfeel.me`}
        >
          <Typography sx={{ ml: 1, display: "inline" }}>Marketplace</Typography>
        </a>
      </div>
    );
    right = (
      <div className="right">
        <AccountMenu />
      </div>
    );
  }

  return (
    <AppBar color="inherit" elevation={0}>
      <Toolbar>
        {left}
        <Box
          sx={{
            flexGrow: 1,
            textAlign: "center",
            display: { xs: "none", md: "block", lg: "block" },
          }}
        >
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
            variant="h5"
          >
            DREAMFEEL SPACES
          </Typography>
        </Box>
        {right}
        <style jsx>{`
          nav {
            display: flex;
            align-items: center;
          }
        `}</style>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
