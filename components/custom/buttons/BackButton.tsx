import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

type BackButtonProps = {
  label?: string;
  loadingMsg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hiddenIcon?: boolean;
  to: string;
};

export default function BackButton({
  label,
  isLoading,
  loadingMsg,
  disabled,
  hiddenIcon,
  to,
}: BackButtonProps) {
  const defaultLabel = label || "Voltar";
  const defaultLoadingMsg = loadingMsg || "Voltando...";
  const canLoad = isLoading && !disabled;

  return (
    <Link className="w-fit" href={to}>
      <Button
        id="back-button"
        type="submit"
        size="sm"
        disabled={isLoading || disabled}
        className="m-0 p-2 cursor-pointer text-white hover:text-white bg-indigo-500 hover:bg-indigo-400"
      >
        {!hiddenIcon && !isLoading && <ChevronLeftIcon className="p-0 m-0" />}
        {!canLoad ? defaultLabel : null}
        {canLoad ? defaultLoadingMsg : null}
      </Button>
    </Link>
  );
}
