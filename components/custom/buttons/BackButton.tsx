import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

type BackButtonProps = {
    label?: string
    loadingMsg?: string
    isLoading?: boolean
    disabled?: boolean
    hiddenIcon?: boolean
    to: string
}

export default function BackButton({ label, isLoading, loadingMsg, disabled, hiddenIcon, to }: BackButtonProps) {
    const defaultLabel = label || "Voltar"
    const defaultLoadingMsg = loadingMsg || "Voltando..."
    const canLoad = isLoading && !disabled

    return (
        <Link className="w-fit" href={to}>
            <Button
                id="back-button"
                className="cursor-pointer text-white hover:text-white"
                type="submit"
                disabled={isLoading || disabled}>
                {!hiddenIcon && !isLoading && <ChevronLeftIcon className="ml-2" />}
                {!canLoad ? defaultLabel : null}
                {canLoad ? defaultLoadingMsg : null}
            </Button>
        </Link>
    )
}