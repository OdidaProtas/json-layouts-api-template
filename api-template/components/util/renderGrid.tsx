import React from "react";
import renderComponents from "./renderComponents";
import BasicGrid from "./components/Grid";

export default function renderGrid({ components = [], spacing = 2 }: any) {
  return <BasicGrid components={components} spacing={spacing} />;
}
