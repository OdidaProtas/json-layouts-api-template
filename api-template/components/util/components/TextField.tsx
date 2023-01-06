import MuiTextField from "@mui/material/TextField";

export default function TextField({
  label,
  type,
  handleChange,
  value,
  name,
}: any) {
  return (
    <MuiTextField
      label={label}
      name={name}
      onChange={handleChange}
      value={value}
      type={type ?? "text"}
    />
  );
}
