import { Typography } from "@mui/material";
import useDetail from "../hooks/useRow";

export default function Text({ text, variant = "body1", api = {} }: any) {
  const [row, loadingRow] = useDetail(api);
  console.log(api, row);

  function getText() {
    if (api?.id) {
      if (loadingRow) {
        return "...";
      }
      if (row) {
        const mapState = api?.mapState;
        return row[mapState?.text];
      }
      return "...";
    }
    return text;
  }
  return <Typography variant={variant as any}>{getText()}</Typography>;
}
