import React from "react";
import Form from "./components/Form";

export default function renderForm({ components = [], api = {} }: any) {
  return <Form components={components} api={api} />;
}
