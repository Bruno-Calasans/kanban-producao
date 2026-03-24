import { Button } from "@/components/ui/button";


type ConfirmButtonProps = {
    title?: string
    loading?: boolean
}

export default function ConfirmButton({ title, loading }: ConfirmButtonProps) {
    return (
        <Button
            className="cursor-pointer bg-indigo-400 text-white hover:text-white hover:bg-indigo-500"
            type="submit"
            disabled={loading}>
            {loading ? "Processando..." : title || "Criar"}
        </Button>
    )
}