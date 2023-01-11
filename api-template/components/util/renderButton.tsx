import Button from "./components/Button";

export interface IButton {
  color: "primary" | "secondary" | "error";
  text: string;
  clickAction: string;
  fullWidth: boolean;
  sx?: any;
  variant?: "contained" | "outlined";
  disabled: boolean;
  target: string;
  href: string;
  type: string;
  loading: boolean;
  handleSubmit: any;
  api?: any;
}

export default function renderButton({
  color = "primary",
  text = "",
  clickAction,
  fullWidth = false,
  sx = {},
  variant = "contained",
  disabled = true,
  target,
  href,
  type,
  loading,
  handleSubmit,
  api,
}: IButton) {
  return (
    <Button
      disabled={disabled}
      text={text}
      clickAction={clickAction}
      sx={sx}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      href={href}
      type={type}
      loading={loading}
      handleSubmit={handleSubmit}
      target={target}
      api={api}
    />
  );
}
