import { Divider, Toolbar } from "@mui/material";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Toolbar />
    <Divider />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 1rem;
        background-image: url("https://raw.githubusercontent.com/OdidaProtas/pyTimetable/development/assets2/dd%5B1%5D.png");
        // background: rgba(0, 0, 0, 0.05);
        // background-size:cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
    `}</style>
  </div>
);

export default Layout;
