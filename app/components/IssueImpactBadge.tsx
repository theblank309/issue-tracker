import React from "react";
import { Impact } from "@/app/schema";
import { Badge } from "@radix-ui/themes";

interface Props {
  impact: Impact;
  size?: "1" | "2" | "3";
}

const impactMap: Record<
  string,
  { label: string; color: "red" | "violet" | "green" }
> = {
  HIGH: { label: "High", color: "red" },
  MODERATE: { label: "Moderate", color: "violet" },
  LOW: { label: "Low", color: "green" },
};

const IssueImpactBadge = ({ impact, size = "2" }: Props) => {
  if (!impact) return null;
  return (
    <Badge size={size} color={impactMap[impact].color}>
      {impactMap[impact].label}
    </Badge>
  );
};

export default IssueImpactBadge;
