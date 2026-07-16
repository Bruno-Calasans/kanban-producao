import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CountBadgeProps = {
  amount: number;
  className?: string;
};

export default function CountBadge({ amount, className }: CountBadgeProps) {
  return (
    <Badge
      className={cn(
        "flex justify-center items-center rounded-full w-2 h-4 text-xs bg-indigo-500 p-2.5",
        className,
      )}
    >
      {amount}
    </Badge>
  );
}
