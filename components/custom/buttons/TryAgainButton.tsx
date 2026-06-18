"use client";

import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type TryButtonProps = {
  label?: string;
  loadingMsg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hiddenIcon?: boolean;
};

export default function TryButton({
  label,
  isLoading,
  loadingMsg,
  disabled,
  hiddenIcon,
}: TryButtonProps) {
  const router = useRouter();
  const defaultLabel = label || "Tentar novamente";
  const defaultLoadingMsg = loadingMsg || "Recarregando...";
  const canLoad = isLoading && !disabled;

  return (
    <Button
      id="try-button"
      type="submit"
      size="sm"
      disabled={isLoading || disabled}
      className="m-0 p-2 cursor-pointer text-white hover:text-white bg-slate-500 hover:bg-slate-400"
      onClick={() => window.location.reload()}
    >
      {!hiddenIcon && !isLoading && <RotateCcwIcon className="p-0 m-0" />}
      {!canLoad ? defaultLabel : null}
      {canLoad ? defaultLoadingMsg : null}
    </Button>
  );
}
