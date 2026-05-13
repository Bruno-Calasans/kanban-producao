import { MovimentationDeadlinePopulated } from "@/types/database.type";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type WeekDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  isExpected?: boolean;
};

export default function WeekDeadlineCard({ deadline, isExpected }: WeekDeadlineCardProps) {
  const { departament, movimentation } = deadline;

  return (
    <Badge
      asChild
      className={cn(
        "flex flex-co h-fit rounded-none p-3 mt-2 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        isExpected && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
      )}
    >
      <Link
        className={cn(
          "[a]:hover:bg-secondary hover:border-1 hover:border-blue-700 transiton-all",
          isExpected && "hover:border-red-700",
        )}
        href={`/movimentations/${movimentation.id}`}
      >
        <div className="flex flex-col items-start">
          <p className="font-bold mb-1">{movimentation.product.name}</p>
          <p>MOVIMENTAÇÃO: #{movimentation.id}</p>
          <p>QUANTIDADE: {movimentation.amount}</p>

          {/* <Badge
            className={cn(
              "w-full mt-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
              isExpected && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
            )}
            asChild
          >
            {isExpected ? <p>Terminar</p> : <p>Começar</p>}
          </Badge> */}
        </div>
      </Link>
    </Badge>
  );
}
