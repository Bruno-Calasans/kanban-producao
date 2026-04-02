import { Button } from "@/components/ui/button";
import { PackagePlusIcon } from "lucide-react";

type ConfirmButtonProps = {
    label?: string
    loadingMsg?: string
    isLoading?: boolean
    disabled?: boolean
    hiddenIcon?: boolean
}

export default function ConfirmButton({ label, isLoading, loadingMsg, disabled, hiddenIcon }: ConfirmButtonProps) {
    const defaultLabel = label || "Confirmar"
    const defaultLoadingMsg = loadingMsg || "Confirmando..."
    const canLoad = isLoading && !disabled

    return (
        <Button
            id="confirm-button"
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit"
            disabled={isLoading || disabled}>
            {!canLoad ? defaultLabel : null}
            {canLoad ? defaultLoadingMsg : null}
            {!hiddenIcon && !isLoading && <PackagePlusIcon className="ml-2" />}
        </Button>
    )
}