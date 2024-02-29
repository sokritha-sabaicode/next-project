import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Personal-Project/Atoms/Button",
  component: Button,
  args: {
    children: "Button"
  },
  parameters: {
    layout: "centered",
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1005%3A2974&t=8pzYUq8GyzmMGjJ2-4',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
