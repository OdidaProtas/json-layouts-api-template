import MuiAvatar from "@mui/material/Avatar";
import useDetail from "../../../hooks/useRow";

export default function Avatar({ clickAction = "", imageUrl, api = {} }: any) {
  const [row, loadingRow] = useDetail(api);
  return <MuiAvatar src={imageUrl} sx={{ cursor: "pointer" }}></MuiAvatar>;
}
