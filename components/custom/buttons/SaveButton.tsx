import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

type SaveButtonProps = {
    label?: string
    loadingMsg?: string
    isLoading?: boolean
    disabled?: boolean
    hiddenIcon?: boolean
}

export default function SaveButton({ label, isLoading, loadingMsg, disabled, hiddenIcon }: SaveButtonProps) {
    const defaultLabel = label || "Salvar"
    const defaultLoadingMsg = loadingMsg || "Salvando..."
    const canLoad = isLoading && !disabled

    return (
        <Button
            id="save-button"
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit"
            disabled={isLoading || disabled}>
            {!hiddenIcon && !isLoading && <SaveIcon className="ml-2" />}
            {canLoad ? defaultLoadingMsg : defaultLabel}
        </Button>

    )
}