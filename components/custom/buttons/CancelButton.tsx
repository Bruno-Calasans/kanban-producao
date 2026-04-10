import { Button } from "@/components/ui/button";
import { CircleXIcon } from "lucide-react";


type CancelButtonProps = {
    title?: string
    isLoading?: boolean
    showIcon?: boolean
    onclick?: () => void
}

export default function CancelButton({ title, isLoading, showIcon = true, onclick }: CancelButtonProps) {
    return (
        <Button
            onClick={onclick ? onclick : undefined}
            className="cursor-pointer"
            title="Cancelar"
            variant="outline"
            disabled={isLoading}
            type="button"
        >

            {showIcon && <CircleXIcon />}
            {title || "Cancelar"}
        </Button>

    )
}