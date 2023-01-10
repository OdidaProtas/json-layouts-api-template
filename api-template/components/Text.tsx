import { Typography, Skeleton } from "@mui/material";
import useDetail from "../hooks/useRow";

export default function Text({ text = "", variant = "body1", api = {} }: any) {
  const [row, loadingRow] = useDetail(api);

  function getText() {
    if (api?.id) {
      if (loadingRow) {
        return "...";
      }
      if (row) {
        const mapState = api?.mapState;
        const rowData = JSON.parse(row?.rowDraft ?? "{}");
        return rowData[mapState?.text];
      }
      return text;
    }
    return text;
  }

  if (api?.id && loadingRow) {
    return <Skeleton />;
  }

  return <Typography variant={variant as any}>{getText()}</Typography>;
}
