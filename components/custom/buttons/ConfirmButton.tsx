import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";


type ConfirmButtonProps = {
    title?: string
    loadingMsg?: string
    isLoading?: boolean
}

export default function ConfirmButton({ title, isLoading, loadingMsg }: ConfirmButtonProps) {
    return (
        <Button
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit"
            disabled={isLoading}>
            <PlusIcon />
            {isLoading ? (loadingMsg || "Criando...") : title || "Criar"}
        </Button>
    )
}