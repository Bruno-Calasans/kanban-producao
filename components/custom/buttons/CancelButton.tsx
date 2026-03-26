import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { CircleXIcon } from "lucide-react";


type CancelButtonProps = {
    title?: string
    isLoading?: boolean
    onclick?: () => void
}

export default function CancelButton({ title, isLoading, onclick }: CancelButtonProps) {
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
                <CircleXIcon />
                {title || "Cancelar"}
            </Button>
        </DialogClose>

    )
}