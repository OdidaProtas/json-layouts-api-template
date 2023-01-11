import { Alert, LinearProgress } from "@mui/material";
import React from "react";
import { useAxios } from "../../../hooks/useAxios";
import useToast from "../../../hooks/useToast";
import useTransformComponents from "../../../hooks/useTransformComponents";
import { useSocket } from "../../../lib/socket";
import renderComponents from "../renderComponents";
import renderStack from "../renderStack";
import { Stack, Skeleton } from "@mui/material";
import useDetail from "../../../hooks/useRow";

export default function Form({ components = [], api = {} }: any) {
  const [saving, setSaving] = React.useState(false);

  const [apiComponents, loadingApiComponents, error] =
    useTransformComponents(api);

  const [row, loadingRow] = useDetail(api);

  const recordId = api?.id;

  components = [...components, ...(apiComponents ?? [])];

  const keys = components.map((c) => c.data.name).filter(Boolean);

  const keysObj = keys.reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: "",
    };
  }, {});

  const [state, setState] = React.useState(() => keysObj);

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((p: any) => ({ ...p, [name]: value }));
  };

  const { showToast } = useToast();

  const axios = useAxios();

  const socket = useSocket();

  const handleSubmit = async () => {
    setSaving(true);
    const payload = {
      tableId: recordId,
      rowDraft: JSON.stringify(state ?? {}),
    };
    let res;
    if (api.update)
      res = await axios.post(`/api/resource/data/row`, { ...payload });
    else
      res = await axios.put(`/api/resource/data/row`, {
        ...payload,
        id: row?.id,
      });
    if (res.data) {
      let row = JSON.parse(res.data.rowDraft ?? "");
      // table.addRow(row);
      showToast("success", "Record saved");
      setSaving(false);
      socket.emit("add_to_collection", {
        id: recordId,
        row: row,
      });
      return;
    }
    setSaving(false);
    showToast("error", "An error occured, Record not saved");
  };

  const componentData = () =>
    (components ?? [])?.map((component: any) => ({
      ...component,
      data: {
        ...component.data,
        handleChange,
        value: state[component.name],
        submitting: saving,
        handleSubmit,
      },
    }));

  const fields = renderComponents(componentData());
  const fieldStack = renderStack(fields);

  React.useEffect(() => {
    if (row?.id && api?.update) {
      setState(() => JSON.parse(row.rowDraft));
    }
  }, [row?.id]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {error && (
        <>
          <Alert severity="error">An error occured</Alert>
        </>
      )}
      {fieldStack}
      {loadingApiComponents && Boolean(api?.id) && (
        <Stack spacing={3}>
          {[1, 2, 3, 4].map((item) => {
            return <Skeleton key={item} height={69} variant="rectangular" />;
          })}
        </Stack>
      )}
    </form>
  );
}
