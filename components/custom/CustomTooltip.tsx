import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

declare const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
type Side = (typeof SIDE_OPTIONS)[number];

type CustomTooltipProps = {
    children: React.ReactNode
    content: React.ReactNode
    side?: Side
}

export default function CustomTooltip({ children, content, side }: CustomTooltipProps) {

    return <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side || "bottom"}>
            {content}
        </TooltipContent>
    </Tooltip>
}