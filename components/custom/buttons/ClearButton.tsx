import { Button } from "@/components/ui/button";
import { BrushCleaningIcon } from "lucide-react";


type ClearButtonProps = {
    title?: string
    onclick: () => void
}

export default function ClearButton({ title, onclick }: ClearButtonProps) {
    return (
        <Button

            className="cursor-pointer"
            title="Limpa todos os campos do formulário"
            variant="outline"
            type="submit"
            onClick={onclick}
        >
            <BrushCleaningIcon />
            {title || "Limpar"}
        </Button>

    )
}