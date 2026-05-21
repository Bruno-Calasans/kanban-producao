"use client";

import CustomTooltip from "./CustomTooltip";
import { AsteriskIcon } from "lucide-react";

export default function RequiredFieldTooltip() {
  return (
    <CustomTooltip content="Este campo é obrigatório" side="right">
      <AsteriskIcon size={16} />
    </CustomTooltip>
  );
}
