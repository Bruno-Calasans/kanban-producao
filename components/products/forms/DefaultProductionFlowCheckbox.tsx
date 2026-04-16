import { Checkbox } from "@/components/ui/checkbox";

type DefaultProductionFlowCheckboxProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function DefaultProductionFlowCheckbox({
  value,
  onValueChange,
}: DefaultProductionFlowCheckboxProps) {
    
  return (
    <Checkbox
      id="use-default-production-flow"
      name="use-default-production-flow"
      checked={value}
      onCheckedChange={onValueChange}
    />
  );
}
