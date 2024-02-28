import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Personal-Project/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    a11y: {
      
    }
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    color: "primary",
    size: "md",
    rounded: "none",
  
  },
};
