import React from "react";
import renderComponents from "./renderComponents";
import BasicGrid from "./components/Grid";

export default function renderGrid({
  components = [],
  spacing = 2,
  api = {},
  xs,
  md,
  lg
}: any) {
  return <BasicGrid xs={xs} md={md} lg={lg} components={components} spacing={spacing} api={api} />;
}
