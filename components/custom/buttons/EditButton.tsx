import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

type EditButtonProps = {
  label?: string;
  loadingMsg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hiddenIcon?: boolean;
  to: string;
};

export default function EditButton({
  label,
  isLoading,
  loadingMsg,
  disabled,
  hiddenIcon,
  to,
}: EditButtonProps) {
  const defaultLabel = label || "Editar";
  const defaultLoadingMsg = loadingMsg || "Voltando...";
  const canLoad = isLoading && !disabled;

  return (
    <Link className="w-fit" href={to}>
      <Button
        id="back-button"
        className="cursor-pointer text-white hover:text-white"
        type="submit"
        disabled={isLoading || disabled}
      >
        {!hiddenIcon && !isLoading && <Edit2Icon className="ml-2" />}
        {!canLoad ? defaultLabel : null}
        {canLoad ? defaultLoadingMsg : null}
      </Button>
    </Link>
  );
}
