import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";

type CancelActionButtonProps = {
    isLoading?: boolean
    label?: string
    disabled?: boolean
    loadingMsg?: string
    hiddenIcon?: boolean
    onclick: () => void
}

export default function CancelActionButton({ label, disabled, isLoading, hiddenIcon, loadingMsg, onclick }: CancelActionButtonProps) {
    const defaultLabel = label || "Cancelar"
    const defaultLoadingMsg = loadingMsg || "Cancelando..."
    const canLoad = isLoading && !disabled

    return (
        <Button
            title="Cancelar ação"
            onClick={onclick}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:text-white"
            variant="outline"
            disabled={isLoading}
            type="button"
        >
            {canLoad ? defaultLoadingMsg : defaultLabel}
            {!hiddenIcon && !isLoading && <BanIcon />}
        </Button>
    )
}