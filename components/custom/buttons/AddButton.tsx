import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type AddButtonProps = {
  label: string;
  onClick?: () => void;
};

export default function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <Button
      size="sm"
      onClick={onClick}
      className="self-end bg-emerald-500 hover:bg-emerald-600 text-white mb-4 cursor-pointer"
    >
      <CirclePlusIcon className="mr-2" />
      {label}
    </Button>
  );
}
