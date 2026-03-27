import { cn } from "@/lib/utils"


type LoaderProps = {
    className?: string
    title?: string
}

export default function Loader({ className, title }: LoaderProps) {
    return <div className="flex flex-col items-center justify-center gap-1">
        <div
            className={cn("w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin", className)}>
        </div>
        <p className="text-md italic text-stone-700">{title ? title : "Carregando..."}</p>
    </div>

}