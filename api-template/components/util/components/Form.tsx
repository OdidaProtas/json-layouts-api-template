import { Alert, LinearProgress } from "@mui/material";
import React from "react";
import useTransformComponents from "../../../hooks/useTransformComponents";
import renderComponents from "../renderComponents";
import renderStack from "../renderStack";

export default function Form({ components = [], api = {} }: any) {
  const [saving, setSaving] = React.useState(false);

  const [apiComponents, loadingApiComponents, error] =
    useTransformComponents(api);

  components = [...components, ...(apiComponents ?? [])];

  const [state, setState] = React.useState(() =>
    components.reduce((p: any, c: any) => ({ ...p, [c.name]: "" }), {})
  );
  const [loading, setLoading] = React.useState({});

  const handleChange = React.useCallback((e: any) => {
    const { name, value } = e.target;
    setState((p: any) => ({ ...p, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true)
  };

  const componentData = React.useMemo(
    () =>
      components.map((component: any) => ({
        ...component,
        handleChange,
        value: state[component.name],
        submitting: loading,
      })),
    [components, handleChange, state, loading]
  );

  const fields = renderComponents(componentData);
  const fieldStack = renderStack(fields);

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <>
          <Alert severity="error">An error occured</Alert>
        </>
      )}
      {fieldStack}
      {loadingApiComponents && (
        <>
          <LinearProgress />
        </>
      )}
    </form>
  );
}
