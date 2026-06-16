import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type DeleteButtonProps = {
  isLoading?: boolean;
  label?: string;
  disabled?: boolean;
  loadingMsg?: string;
  hiddenIcon?: boolean;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  onClick: () => void;
};

export default function DeleteButton({
  label,
  disabled,
  isLoading,
  hiddenIcon,
  loadingMsg,
  size,
  onClick,
}: DeleteButtonProps) {
  const defaultLabel = label || "Excluir";
  const defaultLoadingMsg = loadingMsg || "Excluindo...";
  const canLoad = isLoading && !disabled;

  return (
    <Button
      title="Excluir registro"
      onClick={onClick}
      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:text-white"
      variant="outline"
      disabled={isLoading}
      size={size}
      type="button"
    >
      {canLoad ? defaultLoadingMsg : defaultLabel}
      {!hiddenIcon && !isLoading && <Trash2Icon />}
    </Button>
  );
}
