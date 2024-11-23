import { Button, IconButton, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import List from "@mui/material/List";
import { Meta, StoryFn } from "@storybook/react";
import { Label } from "components/label";
import { FAIcon, FAIconProps } from "./fa-icon.component";

export default {
  title: "Components/FAIcon",
  component: FAIcon,
} as Meta<typeof FAIcon>;

const Template: StoryFn<FAIconProps> = (args) => <FAIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: "solid",
  icon: "user",
};

export const WithButton: StoryFn<FAIconProps> = (args) => (
  <Stack gap={1}>
    <FAIcon {...args} fontSize="large" />
    <Button variant="contained" size="large" startIcon={<FAIcon {...args} />}>Button with large Icon</Button>
    <IconButton size="large" ><FAIcon {...args} /></IconButton>
    <FAIcon {...args} fontSize="medium" />
    <Button variant="contained" startIcon={<FAIcon {...args} />}>Button with medium Icon</Button>
    <IconButton ><FAIcon {...args} /></IconButton>
    <FAIcon {...args} fontSize="small" />
    <Button variant="contained" size="small" startIcon={<FAIcon {...args} />}>Button with small Icon</Button>
    <IconButton size="small" ><FAIcon {...args} /></IconButton>
  </Stack>
);
WithButton.args = {
  variant: "solid",
  icon: "circle-exclamation",
};

export const WithList: StoryFn<FAIconProps> = (args) => (
  <List>
    <ListItem>
      <ListItemIcon>
        <FAIcon {...args} />
      </ListItemIcon>
      <ListItemText primary="First Item" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <FAIcon {...args} icon="check-circle" />
      </ListItemIcon>
      <ListItemText primary="Second Item" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <FAIcon {...args} icon="info-circle" />
      </ListItemIcon>
      <ListItemText primary="Third Item" />
    </ListItem>
  </List>
);
WithList.args = {
  variant: "solid",
};

export const DifferentVariants: StoryFn = () => (
  <div>
    <FAIcon variant="solid" icon="circle-exclamation" />
    <FAIcon variant="duotone" icon="circle-exclamation" />
  </div>
);

export const IconGallery: StoryFn = () => (
  <div>
    <FAIcon variant="solid" icon="circle-exclamation" />
    <FAIcon variant="solid" icon="check-circle" />
    <FAIcon variant="solid" icon="info-circle" />
    <FAIcon variant="solid" icon="question-circle" />
  </div>
);

export const WithLabel: StoryFn<FAIconProps> = (_args) => (
  <Stack gap={2}>
    <Stack gap={1} direction="row">
      <Label startIcon={<FAIcon icon="user" />}>Label</Label>
    </Stack>
    <Stack gap={1} direction="row">
      <Label fontSize="small" startIcon={<FAIcon icon="user" />}>
        Label
      </Label>
    </Stack>
    <Stack gap={1} direction="row">
      <Label fontSize="large" startIcon={<FAIcon icon="user" />}>
        Label
      </Label>
    </Stack>
  </Stack>
);
