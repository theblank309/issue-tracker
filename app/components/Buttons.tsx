"use client";
import { Button as RButton } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  width?: string;
}

const PrimaryButton = ({
  children,
  disabled = false,
  width = "auto",
}: Props) => {
  const primaryButtonStyle = {
    backgroundColor: disabled ? "#A9BDD6" : "#1C2541",
    cursor: "pointer",
    color: "#F6F6F6",
    width: width,
  };
  return (
    <RButton disabled={disabled} style={primaryButtonStyle}>
      {children}
    </RButton>
  );
};

export { PrimaryButton };
