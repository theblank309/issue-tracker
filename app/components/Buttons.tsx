import React from "react";
import { Button as RButton } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
}

const PrimaryButton = ({ children, disabled = false }: Props) => {
  return (
    <RButton
      disabled={disabled}
      style={{ backgroundColor: "#1C2541", cursor: "pointer" }}
    >
      {children}
    </RButton>
  );
};

export { PrimaryButton };
