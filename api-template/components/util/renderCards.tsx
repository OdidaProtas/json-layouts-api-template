import Box from "@mui/material/Box";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useDetail from "../../hooks/useRow";
import { Skeleton } from "@mui/material";

export default function ImgMediaCard({
  imageUrl = "",
  actions = [],
  body = "",
  title = "",
  api = {},
}) {
  const [row, loading] = useDetail(api);
  if (loading) {
    return <Skeleton variant="rectangular" height={100} width={345} />;
  }
  console.log(row ?? "api");
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        {actions.map((action) => {
          return (
            <Button size="small" key={action}>
              {action}
            </Button>
          );
        })}
      </CardActions>
    </Card>
  );
}
