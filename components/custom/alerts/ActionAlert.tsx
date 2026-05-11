import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ActionAlertProps = {
  title: string;
  description: string;
  actionLabel: React.ReactNode;
  className?: string;
  onAction: () => void;
};

export function ActionAlert({
  title,
  description,
  actionLabel,
  className,
  onAction,
}: ActionAlertProps) {
  return (
    <Alert className={className}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <AlertAction onClick={onAction}>{actionLabel}</AlertAction>
    </Alert>
  );
}
