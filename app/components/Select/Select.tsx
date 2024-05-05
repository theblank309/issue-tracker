import { Select as RDSelect } from "@radix-ui/themes";
import "@/app/components/Select/styles.css";

interface Props {
  items: { label: string; option: string }[];
  fontSize?: string;
  fontWeight?: number;
}

const Select = ({ items, fontSize = "22px", fontWeight = 400 }: Props) => {
  return (
    <RDSelect.Root defaultValue={items[0].option} size="3">
      <RDSelect.Trigger
        className="customTrigger"
        style={{ fontSize: fontSize, fontWeight: fontWeight }}
      />
      <RDSelect.Content position="popper" align="start">
        {items.map((item) => (
          <RDSelect.Item value={item.option}>{item.label}</RDSelect.Item>
        ))}
      </RDSelect.Content>
    </RDSelect.Root>
  );
};

export default Select;
