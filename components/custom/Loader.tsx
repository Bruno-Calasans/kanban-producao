import { cn } from "@/lib/utils"


type LoaderProps = {
    containerClassname?: string
    titleClassname?: string
    className?: string
    title?: string
    horizontal?: boolean
}

export default function Loader({ containerClassname, title, className, titleClassname, horizontal }: LoaderProps) {

    return (
        <div
            id="loader-container"
            className={cn("flex flex-col items-center justify-center gap-1", horizontal && "flex-row", containerClassname)}>
            <p id="loader-title" className={cn("text-md italic text-stone-700", titleClassname)}>
                {title && title}
            </p>
            {/* the loader */}
            <div
                id="loader"
                className={
                    cn("w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin",
                        className
                    )}>
            </div>
        </div>
    )

}