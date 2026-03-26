import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { CircleXIcon } from "lucide-react";


type CancelButtonProps = {
    title?: string
    isLoading?: boolean
    showIcon?: boolean
    onclick?: () => void
}

export default function CancelButton({ title, isLoading, showIcon = true, onclick }: CancelButtonProps) {
    return (
        <DialogClose>
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
        </DialogClose>

    )
}