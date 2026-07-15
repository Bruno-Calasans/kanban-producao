import { Button } from "@/components/ui/button";
import { UndoIcon } from "lucide-react";

type UndoButtonProps = {
  isLoading?: boolean;
  label?: string;
  disabled?: boolean;
  loadingMsg?: string;
  hiddenIcon?: boolean;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  onClick: () => void;
};

export default function UndoButton({
  label,
  disabled,
  isLoading,
  hiddenIcon,
  loadingMsg,
  size,
  onClick,
}: UndoButtonProps) {
  const defaultLabel = label || "Desfazer";
  const defaultLoadingMsg = loadingMsg || "Desfazendo...";
  const canLoad = isLoading && !disabled;

  return (
    <Button
      title="Desfazer registro"
      onClick={onClick}
      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:text-white"
      variant="outline"
      disabled={isLoading}
      size={size}
      type="button"
    >
      {canLoad ? defaultLoadingMsg : defaultLabel}
      {!hiddenIcon && !isLoading && <UndoIcon />}
    </Button>
  );
}
