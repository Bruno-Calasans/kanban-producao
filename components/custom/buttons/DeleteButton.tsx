import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";

type DeleteButtonProps = {
    title?: string
    isLoading?: boolean
    onclick: () => void
}

export default function DeleteButton({ title, isLoading, onclick }: DeleteButtonProps) {
    return (
        <DialogClose>
            <Button
                onClick={onclick}
                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:text-white"
                title="Excluir registro"
                variant="outline"
                disabled={isLoading}
                type="button"
            >
                <Trash2Icon />
                {title || "Excluir"}
            </Button>
        </DialogClose>
    )
}