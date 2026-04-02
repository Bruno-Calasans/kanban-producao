import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type DeleteButtonProps = {
    isLoading?: boolean
    label?: string
    disabled?: boolean
    loadingMsg?: string
    hiddenIcon?: boolean
    onclick: () => void
}

export default function DeleteButton({ label, disabled, isLoading, hiddenIcon, loadingMsg, onclick }: DeleteButtonProps) {
    const defaultLabel = label || "Excluir"
    const defaultLoadingMsg = loadingMsg || "Excluindo..."
    const canLoad = isLoading && !disabled

    return (
        <Button
            title="Excluir registro"
            onClick={onclick}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:text-white"
            variant="outline"
            disabled={isLoading}
            type="button"
        >
            {canLoad ? defaultLoadingMsg : defaultLabel}
            {!hiddenIcon && !isLoading && <Trash2Icon />}
        </Button>
    )
}