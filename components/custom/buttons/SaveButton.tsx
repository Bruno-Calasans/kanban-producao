import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";


type SaveButtonProps = {
    title?: string
    loadingMsg?: string
    isLoading?: boolean
}

export default function SaveButton({ title, isLoading, loadingMsg }: SaveButtonProps) {
    return (
        <Button
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit"
            disabled={isLoading}>
            <SaveIcon />
            {isLoading ? loadingMsg || "Salvando..." : title || "Salvar"}
        </Button>
    )
}