import { Button } from "@/components/ui/button";


type ConfirmButtonProps = {
    title?: string
}

export default function ConfirmButton({ title }: ConfirmButtonProps) {
    return (
        <Button
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit">
            {title || "Criar"}
        </Button>
    )
}