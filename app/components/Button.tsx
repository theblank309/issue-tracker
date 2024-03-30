import React from "react";
import { Button as RButton } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  disabled?: boolean;
}

const Button = ({ children, bgColor = "#1C2541", disabled = false }: Props) => {
  return (
    <RButton disabled={disabled} style={{ backgroundColor: bgColor }}>
      {children}
    </RButton>
  );
};

export default Button;
