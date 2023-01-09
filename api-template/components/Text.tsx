import { Typography } from "@mui/material";
import useDetail from "../hooks/useRow";

export default function Text({ text, variant = "body1", api = {} }) {
  const [row] = useDetail(api);
  console.log(api);
  return (
    <Typography variant={variant as any}>
      {JSON.stringify(row ?? null)}
    </Typography>
  );
}
