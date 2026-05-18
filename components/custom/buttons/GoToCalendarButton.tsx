import { Button } from "@/components/ui/button";
import { Calendar1Icon } from "lucide-react";
import Link from "next/link";

type GoToCalendarButtonProps = {
  label?: string;
  loadingMsg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hiddenIcon?: boolean;
  to: string;
};

export default function GoToCalendarButton({
  label,
  isLoading,
  loadingMsg,
  disabled,
  hiddenIcon,
  to,
}: GoToCalendarButtonProps) {
  const defaultLabel = label || "Voltar";
  const defaultLoadingMsg = loadingMsg || "Voltando...";
  const canLoad = isLoading && !disabled;

  return (
    <Link className="w-fit" href={to}>
      <Button
        id="go-to-calendar-button"
        type="submit"
        size="sm"
        disabled={isLoading || disabled}
        className="m-0 p-2 cursor-pointer text-white hover:text-white bg-indigo-500 hover:bg-indigo-400"
      >
        {!hiddenIcon && !isLoading && <Calendar1Icon className="p-0 m-0" />}
        {!canLoad ? defaultLabel : null}
        {canLoad ? defaultLoadingMsg : null}
      </Button>
    </Link>
  );
}
