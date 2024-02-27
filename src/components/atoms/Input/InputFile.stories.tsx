import type { Meta, StoryObj } from "@storybook/react";
import { InputFile } from "./InputFile";

const meta: Meta<typeof InputFile> = {
  title: "Personal-Project/Atoms/InputFile",
  component: InputFile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputFile>;

export const Default: Story = {
  args: {
    size: "md",
    className:
      "text-white file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white ",
  },
};
