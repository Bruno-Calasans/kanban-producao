import { cn } from "@/lib/utils";
import type { ComponentType } from "react";
import { ClassNameValue } from "tailwind-merge";

type ItemInfoData = {
  label: string;
  value: React.ReactNode;
  icon?: ComponentType<{ size?: number; className?: string }>;
};

type ItemInfoProps = {
  item: ItemInfoData;
  vertical?: boolean;
  classnames?: {
    container?: ClassNameValue;
    content?: ClassNameValue;
    label?: ClassNameValue;
  };
};

export default function ItemInfo({ item, classnames, vertical }: ItemInfoProps) {
  if (vertical) {
    return (
      <div className={cn("flex gap-0.5 flex-1", classnames?.container)}>
        {item.icon && <item.icon size={16} className="self-start mt-0.5" />}
        <p className={cn("flex flex-col", classnames?.content)}>
          <span className={cn("font-bold", classnames?.label)}>{item.label}</span> {item.value}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-0.5 flex-1", classnames?.container)}>
      {item.icon && <item.icon size={16} />}
      <p className={cn(classnames?.content)}>
        <span className={cn("font-bold", classnames?.label)}>{item.label}</span> {item.value}
      </p>
    </div>
  );
}
