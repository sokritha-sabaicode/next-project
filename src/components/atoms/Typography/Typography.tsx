import React, { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "base" | "md" | "lg" | "xl";
}

const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  size = "base",
}) => {
  const TypographySize = (size: string) => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "md":
        return "text-md";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };
  const getTypographySize = TypographySize(size);
  return <div className={`${getTypographySize} ${className}`}>{children}</div>;
};

export { Typography };
