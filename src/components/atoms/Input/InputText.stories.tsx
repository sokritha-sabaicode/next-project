import type { Meta, StoryObj } from "@storybook/react";
import { InputText } from "./InputText";

const meta: Meta<typeof InputText> = {
  title: "Personal-Project/Atoms/InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    size: "md",
    placeholder: "Enter something...",
    className:
      "my-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg",
  },
};
