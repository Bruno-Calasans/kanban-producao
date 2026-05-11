import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ErrorAlertProps = {
  title: string;
  description: string;
  className?: string;
};

export function ErrorAlert({ title, description, className }: ErrorAlertProps) {
  return (
    <Alert
      variant="destructive"
      className={` border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50 ${className || ""}`}
    >
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
