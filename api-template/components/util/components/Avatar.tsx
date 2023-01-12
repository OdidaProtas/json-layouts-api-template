import MuiAvatar from "@mui/material/Avatar";
import useDetail from "../../../hooks/useRow";

export default function Avatar({
  clickAction = "",
  imageUrl,
  api = {},
  alt = "",
}: any) {
  const [row, loadingRow] = useDetail(api);
  function getValues() {
    if (loadingRow) return { imageUrl, alt };
    if (row) {
      const rowData = JSON.parse(row?.rowDraft ?? "{}");
      const mapState = api?.mapState;
      return {
        imageUrl: rowData[mapState?.imageUrl],
        alt: rowData[mapState?.imageUrl],
      };
    }
    return { imageUrl, alt };
  }
  const { imageUrl: avataImageSource, alt: avatarAlt } = getValues();
  return (
    <MuiAvatar src={avataImageSource} sx={{ cursor: "pointer" }}>
      {avatarAlt}
    </MuiAvatar>
  );
}
