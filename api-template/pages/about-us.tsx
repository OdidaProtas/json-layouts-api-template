import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Layout from "../components/Layout";

export default function AboutUs() {
  return (
    <Layout>
      <Stack sx={{ my: 6 }} spacing={4}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3">About us</Typography>
        </Box>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Stack spacing={9}>
              <Typography sx={{ fontWeight: "bold" }}>
                DREAMFEEL SPACES provides a app-builder that let's developers
                ship apps based on JSON Layouts. Available with native
                functionality for all platforms. DREAMFEEL SPACES is offered by
                a small but stable, committed and hardworking team from Sweden,
                and is dedicated to help you ship high quality applications.
              </Typography>
              <Typography>
                DREAMFEEL SPACES - a tech company dedicated to simplifying
                application development for developers. We provide a set of high
                quality customizable cross-platform applications: Web, IOS,
                Android, and Desktop with native functionality. By doing so, we
                are helping thousands of developers to build distributed systems
                that automatically scales to thousands of active users. But
                above all, we help developers to focus on building new
                applications ideas and innovating and not having to spend time
                on managing coding most applications from scratch.
              </Typography>
              <Container>
                <Typography sx={{ fontSize: 36 }}>
                  Our vision is that developers should never have to set up or
                  maintain code environments to build quality applications.
                  That's why we've made it our mission to let developers focus
                  on their applications by offering a growing set of
                  high-quality app-building services.
                </Typography>
              </Container>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4">The team</Typography>
                <Typography sx={{ mt: 2 }}>
                  Currently the whole team is from Kenya but we are usually
                  located in different timezones around the world. All of us
                  take part in supporting our customers. We have a lot of
                  experience in development - and that's why we are able to
                  support you in many different ways. We are always working to
                  improve our services and trying to give the best customer
                  support possible. We would love to hear your feedback and
                  assist you, if you have any questions, meet us by entering our
                  chat or send us an email.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Stack>
    </Layout>
  );
}
