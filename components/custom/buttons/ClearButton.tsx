import { Button } from "@/components/ui/button";
import { BrushCleaningIcon } from "lucide-react";

type ClearButtonProps = {
  label?: string;
  isLoading?: boolean;
  hiddenIcon?: boolean;
  onClick?: () => void;
};

export default function ClearButton({ label, isLoading, hiddenIcon, onClick }: ClearButtonProps) {
  const defaultLabel = label || "Limpar";

  return (
    <Button
      id="clear-button"
      className="cursor-pointer"
      title="Limpa todos os campos do formulário"
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      type="button"
    >
      {!hiddenIcon && <BrushCleaningIcon />}
      {defaultLabel}
    </Button>
  );
}
