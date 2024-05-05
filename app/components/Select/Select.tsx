"use client";

import { Select as RDSelect } from "@radix-ui/themes";
import styles from "@/app/components/Select/select.module.css";

interface Props {
  items: { label: string; option: string }[];
  fontSize?: string;
  fontWeight?: number;
  defaultValue: string;
}

const Select = ({
  items,
  fontSize = "22px",
  fontWeight = 400,
  defaultValue,
}: Props) => {
  return (
    <RDSelect.Root defaultValue={defaultValue} size="3">
      <RDSelect.Trigger
        className={`${styles.customTrigger} customTriggerAddition`}
        style={{ fontSize: fontSize, fontWeight: fontWeight }}
      />
      <RDSelect.Content position="popper" align="start">
        {items.map((item) => (
          <RDSelect.Item key={item.option} value={item.option}>
            {item.label}
          </RDSelect.Item>
        ))}
      </RDSelect.Content>
    </RDSelect.Root>
  );
};

export default Select;
