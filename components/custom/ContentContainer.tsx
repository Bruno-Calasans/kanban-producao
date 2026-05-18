import { cn } from "@/lib/utils";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentContainer({ children, className }: ContentContainerProps) {
  return <main className={cn("max-w-6xl mx-auto px-4 py-8 flex-1", className)}>{children}</main>;
}
