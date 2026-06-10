import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

type SaveButtonProps = {
  label?: string;
  loadingMsg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hiddenIcon?: boolean;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  onClick?: () => void;
};

export default function SaveButton({
  label,
  isLoading,
  loadingMsg,
  disabled,
  hiddenIcon,
  size,
  onClick,
}: SaveButtonProps) {
  const defaultLabel = label || "Salvar";
  const defaultLoadingMsg = loadingMsg || "Salvando...";
  const canLoad = isLoading && !disabled;

  return (
    <Button
      id="save-button"
      className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
      type="submit"
      disabled={isLoading || disabled}
      size={size}
      onClick={onClick}
    >
      {!hiddenIcon && !isLoading && <SaveIcon className="ml-2" />}
      {canLoad ? defaultLoadingMsg : defaultLabel}
    </Button>
  );
}
