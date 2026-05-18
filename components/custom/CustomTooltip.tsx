import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

declare const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
type Side = (typeof SIDE_OPTIONS)[number];

type CustomTooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: Side;
  disabled?: boolean;
};

export default function CustomTooltip({ children, content, side, disabled }: CustomTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent hidden={disabled} side={side || "top"}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
