import { Skeleton } from "@mui/material";
import MuiButton from "@mui/material/Button";
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
}: any) {
  const [row, loadingRow] = useDetail(api);
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
      onClick={() => {}}
    >
      {text}
    </MuiButton>
  );
}
