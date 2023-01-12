import {
  Divider,
  Switch,
  FormGroup,
  FormControlLabel,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";

import RenderCard from "./renderCards";
import renderGrid from "./renderGrid";
import renderText from "./renderText";

import renderButton from "./renderButton";
import renderTextField from "./renderTextField";
import renderAppbar from "./renderAppbar";
import renderSelect from "./renderSelect";
import renderList from "./renderList";
import renderAlert from "./renderAlert";
import renderTooltip from "./renderTooltip";
import renderImageField from "./renderImageField";
import renderBox from "./renderBox";
import renderImage from "./renderImage";
import renderForm from "./renderForm";
import { IBox } from "./components/Box";
import Markdown from "./components/Markdown";
import DefaultComponent from "./components/DefaultComponent";
import Autocomplete from "./components/AutoComplete";
import Checkbox from "./components/Checkbox";
import Fab from "./components/Fab";
import RadioButtonsGroup from "./components/RadioGroup";
import Rating from "./components/Rating";
import Slider from "./components/Slider";
import TransferList from "./components/TransferList";
import ToggleButton from "./components/ToggleButton";
import Avatar from "./components/Avatar";
import SimpleBadge from "./components/Badge";
import BasicChips from "./components/Chip";
import SimpleDialog from "./components/Dialog";
import Progress from "./components/Progress";
import Skeleton from "./components/Skeleton";
import SimpleSnackbar from "./components/Snackbar";
import ControlledAccordions from "./components/Accordions";
import WovenImageList from "./components/ImageList";
import SimpleContainer from "./components/Container";
import HorizontalStepper from "./components/Stepper";
import BasicSpeedDial from "./components/SpeedDial";
import PaginationOutlined from "./components/Pagination";
import PositionedMenu from "./components/Menu";
import UnderlineLink from "./components/Link";
import TemporaryDrawer from "./components/Drawer";
import Crumbs from "./components/Crumbs";
import BottomNav from "./components/BottomNav";
import Paypal from "./components/Paypal";
import ButtonGroup from "./components/ButtonGroup";
import RenderTabs from "./renderTabs";
import EnhancedTable from "./components/Table";
import Text from "../Text";
import ReactMarkdown from "react-markdown";
import RenderImage from "./renderImage";
import { AppRegistration } from "@mui/icons-material";

export default function renderComponents(components: any[] = []) {
  return components.map((component, index) => {
    const {
      type,
      data = {
        components: [],
      },
    } = component;
    switch (type) {
      case "stack": {
        const { direction, components = [], spacing } = data;
        return (
          <Stack key={index} spacing={spacing} direction={direction}>
            {renderComponents([...components])}
          </Stack>
        );
      }
      case "grid": {
        const {
          components = [],
          spacing = 2,
          api = {},
          xs = 6,
          lg = 6,
          md = 6,
        }: any = data;
        return renderGrid({ components, spacing, api, xs, md, lg });
      }
      case "autocomplete": {
        const { options = [], label = "Select", api = {} } = data;
        return (
          <Autocomplete api={api} label={label} options={options} key={index} />
        );
      }
      case "buttongroup": {
        const { options = [], api = {} } = data;
        return <ButtonGroup api={api} options={options} key={index} />;
      }
      case "dialog": {
        const { buttonText, components = [], api = {} } = data;
        return (
          <SimpleDialog
            key={index}
            components={components}
            buttonText={buttonText}
            api={api}
          />
        );
      }
      case "button": {
        const {
          color = "primary",
          text,
          clickAction,
          fullWidth,
          variant,
          sx = {},
          disabled,
          href,
          target,
          type,
          submitting,
          handleSubmit,
          api = {},
          intents = { click: [] },
        } = data;
        return renderButton({
          color,
          text,
          clickAction,
          variant,
          fullWidth,
          sx,
          disabled,
          href,
          target,
          loading: submitting,
          type,
          handleSubmit,
          api,
          intents,
        });
      }
      case "card": {
        const { imageUrl = "", title, body, actions = [], api = {} } = data;
        return (
          <RenderCard
            api={api}
            actions={actions}
            body={body}
            title={title}
            imageUrl={imageUrl}
          />
        );
      }
      case "image": {
        const {
          imageUrl,
          height = "100%",
          width = "100%",
          alt = "image",
          api = {},
        } = data;
        return (
          <RenderImage
            source={imageUrl}
            api={api}
            height={height}
            alt={alt}
            width={width}
          />
        );
      }
      case "imagelist": {
        const { options = [], height = 450, width = 600 } = data;
        return (
          <WovenImageList
            width={width}
            height={height}
            key={index}
            options={options}
          />
        );
      }
      case "table": {
        const { api = {} }: any = data;
        return <EnhancedTable api={api} />;
      }
      case "form": {
        const { components = [], api = {} }: any = data;
        return renderForm({ components, api });
      }
      case "checkbox": {
        const { defaultChecked = false } = data;
        return <Checkbox defaultChecked={defaultChecked} key={index} />;
      }
      case "textfield": {
        const { label, type, handleChange, value, name } = data;
        return renderTextField({ label, type, handleChange, value, name });
      }
      case "tabs": {
        const { items = [] } = data;
        return <RenderTabs items={items} key={index} />;
      }
      case "paper": {
        const { elevation = 1, padding = 2, components: cmps = [] }: any = data;
        return (
          <Paper elevation={elevation} sx={{ p: padding }}>
            {renderComponents(cmps)}
          </Paper>
        );
      }
      case "box": {
        const {
          components = [],
          centerHorizontal,
          centerVertical,
          minHeight,
          flex,
          textAlign,
          spaceEvenly,
        }: IBox = data;
        return renderBox({
          components,
          centerHorizontal,
          centerVertical,
          minHeight,
          flex,
          textAlign,
          spaceEvenly,
        });
      }
      case "circular_progress": {
        return <CircularProgress />;
      }
      case "breadcrumbs": {
        return <Crumbs />;
      }
      case "drawer": {
        const { options, buttonText } = data;
        return (
          <TemporaryDrawer
            key={index}
            buttonText={buttonText}
            options={options}
          />
        );
      }
      case "link": {
        const { href, text } = data;
        return <UnderlineLink href={href} text={text} key={index} />;
      }
      case "menu": {
        const { options = [] } = data;
        return <PositionedMenu options={options} />;
      }
      case "paypal": {
        return <Paypal />;
      }
      case "speeddial": {
        return <BasicSpeedDial />;
      }
      case "pagination": {
        return <PaginationOutlined />;
      }
      case "sketon": {
        return <Skeleton />;
      }
      case "bottom_navigation": {
        const { options = [] } = data;
        return <BottomNav options={options} />;
      }
      case "snackbar": {
        const { actionText, autoHideDuration, message, buttonText } = data;
        return <SimpleSnackbar />;
      }
      case "progress": {
        return <Progress />;
      }
      case "stepper": {
        const { items = [] } = data;
        return <HorizontalStepper items={items} />;
      }
      case "appbar": {
        return renderAppbar();
      }
      case "select": {
        const { options = [], label, api = {} } = data;
        return renderSelect({ options, label, api });
      }
      case "slider": {
        return <Slider />;
      }
      case "fab": {
        return <Fab />;
      }
      case "radiogroup": {
        const { options = [], api = {} } = data;
        return <RadioButtonsGroup api={api} key={index} options={options} />;
      }
      case "rating": {
        const { initialValue = 3 } = data;
        return <Rating key={index} initialValue={initialValue} />;
      }
      case "container": {
        const { components = [] } = data;
        return <SimpleContainer components={components} />;
      }
      case "switch": {
        const { label } = data;
        return (
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked={false} />}
              label={label}
            />
          </FormGroup>
        );
      }
      case "transferlist": {
        // return renderBox({});
        return <TransferList />;
      }
      case "togglebutton": {
        const { options = [] } = data;
        return <ToggleButton key={index} options={options} />;
      }
      case "accordion": {
        return <ControlledAccordions key={index} />;
      }
      case "avatar": {
        const { clickAction = "", imageUrl, api = {} } = data;
        return (
          <Avatar api={api} imageUrl={imageUrl} clickAction={clickAction} />
        );
      }
      case "badge": {
        const { api = {}, badgeContent = 0, icon = "shopping_basket" } = data;
        return (
          <SimpleBadge
            badgeContent={badgeContent}
            icon={icon}
            key={index}
            api={api}
          />
        );
      }
      case "chip": {
        const { api = {}, label = "Chip" } = data;
        return <BasicChips label={label} api={api} key={index} />;
      }
      case "divider": {
        return <Divider key={index} sx={{ my: 2 }} />;
      }
      // case "icons": {
      // }
      case "list": {
        const { options = 0, api = {}, intents = [] } = data;
        return renderList({ options, api, intents });
      }
      case "tooltip": {
        const { api = {} } = data;
        return renderTooltip({ api });
      }
      case "text": {
        const { text, variant, api = {} } = data as any;
        return <Text text={text} key={index} api={api} variant={variant} />;
      }
      case "alert": {
        const { api = {} } = data;
        return renderAlert({ api });
      }
      case "imagefield": {
        const { desc, value, handleChange, multiple } = data;
        return renderImageField({ desc, value, handleChange, multiple });
      }
      case "markdown": {
        const { text, api = {} } = data;
        return <Markdown text={text} api={api} />;
      }
      default: {
        return (
          <DefaultComponent key={index}>
            {renderText("No component data")}
          </DefaultComponent>
        );
      }
    }
  });
}
