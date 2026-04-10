import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

type MoveNextButtonProps = {
    label?: string
    loadingMsg?: string
    isLoading?: boolean
    disabled?: boolean
    hiddenIcon?: boolean
    onClick?: () => void
}

export default function MoveNextButton({ label, isLoading, loadingMsg, disabled, hiddenIcon, onClick }: MoveNextButtonProps) {
    const defaultLabel = label || "Confirmar"
    const defaultLoadingMsg = loadingMsg || "Confirmando..."
    const canLoad = isLoading && !disabled

    return (
        <Button
            id="confirm-button"
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit"
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {!canLoad ? defaultLabel : null}
            {canLoad ? defaultLoadingMsg : null}
            {!hiddenIcon && !isLoading && <ChevronRightIcon className="ml-2" />}
        </Button>
    )
}