import { Button } from "@/components/ui/button";
import { ArrowLeftRightIcon } from "lucide-react";


type ClearButtonProps = {
    title?: string
    isLoading?: boolean
    disabled?: boolean
    onclick?: () => void
}

export default function MoveButton({ title, isLoading, disabled, onclick }: ClearButtonProps) {
    return (
        <Button
            type="submit"
            variant="outline"
            onClick={onclick && onclick}
            disabled={isLoading || disabled}
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
        >
            <ArrowLeftRightIcon />
            {title || "Movimentar"}
        </Button>

    )
}