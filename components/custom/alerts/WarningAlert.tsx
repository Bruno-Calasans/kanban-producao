import { AlertTriangleIcon, XIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

type WarningAlertProps = {
  title: string;
  description: string;
};

export function WarningAlert({ title, description }: WarningAlertProps) {
  const [close, setClose] = useState(false);

  return (
    <Alert
      hidden={close}
      className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
    >
      <AlertTriangleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <XIcon onClick={() => setClose(true)} className="absolute right-2 top-2" />
    </Alert>
  );
}
