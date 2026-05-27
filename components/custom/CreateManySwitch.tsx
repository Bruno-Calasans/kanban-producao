import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

type CreateManySwitchProps = {
  label?: React.ReactNode;
  value: boolean;
  onChangeValue: (value: boolean) => void;
};

export default function CreateManySwitch({ value, onChangeValue, label }: CreateManySwitchProps) {
  return (
    <Field className="flex flex-row justify-start items-center gap-2">
      <Switch id="use-many" className="w-fit" checked={value} onCheckedChange={onChangeValue} />
      <FieldLabel htmlFor="use-many" className="p-0 m-0">
        {label || "Criar vários"}
      </FieldLabel>
    </Field>
  );
}
