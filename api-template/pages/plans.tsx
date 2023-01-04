import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import { Container, Grid } from "@mui/material";
import usePlans from "../hooks/usePlans";
import ReactMarkdown from "react-markdown";

const steps = [
  {
    label: "Pick a plan",
    description: `Take your online prescence to the next step with a plan suitable for your online prescence`,
  },
  {
    label: "Add payment details",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Checkout plan",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const plans = usePlans() ?? [];

  return (
    <Box>
      <Layout>
        <Container>
          <Typography variant="h4" sx={{ my: 3 }}>
            Plans and billing information
          </Typography>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ my: 3 }}>{step.description}</Typography>
                    {index === 0 && (
                      <Box>
                        <Grid container>
                          {plans.map((plan) => {
                            return (
                              <Grid key={plan.id} item xs>
                                <Paper
                                  elevation={0}
                                  sx={{ p: 2, textAlign: "center", mb: 4 }}
                                >
                                  <Typography sx={{ my: 3 }} variant="h5">
                                    {plan?.name}
                                  </Typography>
                                  <ReactMarkdown>
                                    {plan?.description}
                                  </ReactMarkdown>
                                  <Button
                                    disableElevation
                                    fullWidth
                                    variant="contained"
                                  >
                                    Pick plan
                                  </Button>
                                </Paper>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    )}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </Container>
      </Layout>
    </Box>
  );
}
