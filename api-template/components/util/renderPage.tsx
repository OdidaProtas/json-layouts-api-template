import React from "react";
import Dashboard from "../layouts/dashboard";
import DefaultLayout from "../layouts/defaultlayout";
import renderBox from "./renderBox";

import renderComponents from "./renderComponents";
import renderGrid from "./renderGrid";
import renderStack from "./renderStack";

import Box from "@mui/material/Box";
import AppbarLayout from "../layouts/appbar";

interface Ipage {
  layout: string;
  name: string;
  opts: any;
  components: any[];
}

const defaultPageProps = { layout: "", name: "Page", components: [], opts: {} };

export default function renderPage(page: Ipage = defaultPageProps) {
  const { layout, components, name, opts = { appbar: {} } } = page;

  const children = renderStack(renderComponents(components), 5);

  switch (layout) {
    case "page": {
      return <>{children}</>;
    }
    case "dashboard": {
      const drawerLists = (opts as any)?.lists ?? [];
      return (
        <Box style={{ position: "absolute", width: 100 }}>
          <Dashboard drawer={null}>{children}</Dashboard>;
        </Box>
      );
    }
    case "appbar": {
      const { appbar } = opts;
      return <AppbarLayout appbar={appbar}>{children}</AppbarLayout>;
    }
    default: {
      return <DefaultLayout name={name}>{children}</DefaultLayout>;
    }
  }
}
