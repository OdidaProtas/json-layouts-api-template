import TextField from "./components/TextField";

export default function renderTextField({
  label,
  type,
  handleChange,
  value,
  name,
}: any) {
  return (
    <TextField
      label={label}
      name={name}
      handleChange={handleChange}
      value={value}
      type={type ?? "text"}
    />
  );
}
