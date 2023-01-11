import { Skeleton } from "@mui/material";
import MuiButton from "@mui/material/Button";
import useIntents from "../../../hooks/useIntents";
import useDetail from "../../../hooks/useRow";

export default function Button({
  color = "primary",
  text = "",
  fullWidth,
  sx = {},
  variant = "contained",
  disabled = false,
  href,
  target,
  type,
  loading = false,
  handleSubmit,
  api = {},
  intents = { click: [] },
}: any) {
  const [row, loadingRow] = useDetail(api);

  const intentions = useIntents();

  function handleClick(id) {
    if (intents?.click?.length) {
      for (let intent of intents.click) {
        const actionArr = intent.split(".");
        intentions[actionArr[0]][actionArr[1]](row?.id);
      }
    }
  }

  if (loadingRow) {
    return <Skeleton variant="rectangular" />;
  }
  if (type === "submit") {
    return (
      <MuiButton
        onClick={handleSubmit}
        sx={sx}
        disabled={loading}
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        disableElevation
        type="button"
      >
        {loading ? "Submitting..." : text}
      </MuiButton>
    );
  }
  if (href && target) {
    return (
      <MuiButton
        sx={sx}
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        disableElevation
        href={href}
        target={target}
      >
        {text}
      </MuiButton>
    );
  }

  return (
    <MuiButton
      sx={sx}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      disableElevation
      onClick={handleClick}
    >
      {text}
    </MuiButton>
  );
}
