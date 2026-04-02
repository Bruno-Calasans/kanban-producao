import { Button } from "@/components/ui/button";
import { BrushCleaningIcon } from "lucide-react";


type ClearButtonProps = {
    label?: string
    isLoading?: boolean
    hiddenIcon?: boolean
    onclick?: () => void
}

export default function ClearButton({ label, isLoading, hiddenIcon, onclick }: ClearButtonProps) {
    const defaultLabel = label || "Limpar"

    return (
        <Button
            id="clear-button"
            className="cursor-pointer"
            title="Limpa todos os campos do formulário"
            variant="outline"
            onClick={onclick}
            disabled={isLoading}
            type="button"
        >
            {!hiddenIcon && <BrushCleaningIcon />}
            {defaultLabel}
        </Button>

    )
}