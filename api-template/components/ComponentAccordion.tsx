import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import ComponentForm, { components } from "./ComponentForm";
import ComponentFormTabs from "./ComponenentFormTabs";

export default function CompontentsAccordion({ component, index }) {
  const [componentData, setComponentData] = React.useState(() => component);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComponentData((p) => ({ ...p, [name]: value }));
  };

  const { handleChange: update, handleDelete: deleteComponent } = useActions();

  const handleUpdate = () => update(componentData, index);
  const handleDelete = () => deleteComponent(index);



  return (
    <div>
      <Accordion elevation={0} sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{component.type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ my: 2 }}>Edit component</Typography>
          <ComponentFormTabs data={component} index={index} />
        </AccordionDetails>
        <AccordionActions>
          {/* <Button
            variant="outlined"
            disabled={component.type === componentData.type}
            sx={{ mt: 3 }}
            onClick={handleUpdate}
          >
            Update
          </Button> */}
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 1 }}
            fullWidth
            onClick={handleDelete}
          >
            Delete{" "}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex") ?? 0;
  return {
    handleChange(component, index) {
      try {
        let allPages = [...pages];
        let page = allPages[pageIndex];
        const componentType = component.type;
        page.components[index] = { ...components[componentType], ...component };
        allPages[pageIndex] = page;
        const type = "update_all";
        const payload = allPages;
        const key = "pages";
        dispatch({ type, key, payload });
      } catch (e) {}
    },
    handleDelete(index) {
      try {
        let allPages = [...pages];
        let page = allPages[pageIndex];
        page.components.splice(index, 1);
        allPages[pageIndex] = page;
        const type = "update_all";
        const payload = allPages;
        const key = "pages";
        dispatch({ type, key, payload });
      } catch (e) {}
    },
  };
}
