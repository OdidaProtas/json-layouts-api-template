import useDetail from "../../hooks/useRow";
import { Skeleton } from "@mui/material";

export default function RenderImage({
  source,
  height = "100%",
  width = "100%",
  alt = "image",
  api = {},
}: any) {
  const [row, loadingRow] = useDetail(api);

  function getVals() {
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
    return <Skeleton  height={height}  variant="rectangular" />;
  }

  return <img height={height} width={width} src={source} alt={alt} />;
}
