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
}: any) {
  const [row, loadingRow] = useDetail(api);
  function getValues() {
    if (api?.id) {
      if (loadingRow) {
        return { imageUrl, title, body };
      }
      if (row) {
        const mapState = api?.mapState;
        const rowData = JSON.parse(row?.rowDraft ?? "{}");
        return {
          imageUrl: rowData[mapState?.imageUrl],
          title: rowData[mapState?.title],
          body: rowData[mapState?.body],
        };
      }
      return { imageUrl, title, body };
    }
    return { imageUrl, title, body };
  }

  const { imageUrl: image, title: cardTitle, body: bodyText } = getValues();

  if (loadingRow) {
    return <Skeleton variant="rectangular" height={100} width={345} />;
  }
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bodyText}
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
