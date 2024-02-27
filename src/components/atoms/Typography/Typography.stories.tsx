import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Personal-Project/Atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "This is a heading.",
    size: "md",
  },
};
