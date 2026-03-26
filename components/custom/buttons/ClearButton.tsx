import { Button } from "@/components/ui/button";
import { BrushCleaningIcon } from "lucide-react";


type ClearButtonProps = {
    title?: string
    isLoading?: boolean
    onclick: () => void
}

export default function ClearButton({ title, isLoading, onclick }: ClearButtonProps) {
    return (
        <Button

            className="cursor-pointer"
            title="Limpa todos os campos do formulário"
            variant="outline"
            onClick={onclick}
            disabled={isLoading}
            type="button"
        >
            <BrushCleaningIcon />
            {title || "Limpar"}
        </Button>

    )
}