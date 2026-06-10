import { Button } from "@/components/ui/button";
import { CircleXIcon } from "lucide-react";

type CancelButtonProps = {
  label?: string;
  isLoading?: boolean;
  hiddenIcon?: boolean;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  onClick?: () => void;
};

export default function CancelButton({
  label,
  isLoading,
  hiddenIcon = true,
  size,
  onClick,
}: CancelButtonProps) {
  return (
    <Button
      onClick={onClick ? onClick : undefined}
      className="cursor-pointer"
      title="Cancelar"
      variant="outline"
      type="button"
      size={size}
      disabled={isLoading}
    >
      {!hiddenIcon && <CircleXIcon />}
      {label || "Cancelar"}
    </Button>
  );
}
