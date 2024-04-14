"use client";
import { Button as RButton } from "@radix-ui/themes";
import classnames from "classnames";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
}

const PrimaryButton = ({ children, disabled = false }: Props) => {
  console.log(disabled);
  const primaryButtonStyle = {
    backgroundColor: disabled ? "#A9BDD6" : "#1C2541",
    cursor: "pointer",
    color: "#F6F6F6",
  };
  return (
    <RButton disabled={disabled} style={primaryButtonStyle}>
      {children}
    </RButton>
  );
};

export { PrimaryButton };
