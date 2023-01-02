import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Dash from "../../../components/DashboardLayout";
import useCategory from "../../../hooks/useCategory";

export default function Category() {
  const category = useCategory() ?? { name: "Unknown Category" };
  const router = useRouter();
  return (
    <Dash>
      <Container>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={8}>
            <Typography variant="h4">Category Details</Typography>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ my: 3 }}>Name: {category.name}</Typography>
            <Typography sx={{ my: 3 }}>Desc: {category.description}</Typography>
            <Typography sx={{ my: 3 }}>Status: Active</Typography>
            <Button onClick={() => router.back()} variant="outlined">
              Go back
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dash>
  );
}
