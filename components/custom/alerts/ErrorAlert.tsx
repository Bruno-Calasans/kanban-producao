import { CircleXIcon } from "lucide-react";
import { CustomAlert, CustomAlertProps } from "./CustomAlert";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type ErroAlertProps = CustomAlertProps;

export function ErrorAlert({
  title,
  description,
  alertIcon,
  hideCloseButton,
  closeIcon,
  classNames,
  isDestructive,
  actionLabel,
  onAction,
}: ErroAlertProps) {
  return (
    <CustomAlert
      title={title}
      description={description}
      alertIcon={alertIcon || <CircleXIcon />}
      closeIcon={closeIcon}
      hideCloseButton={hideCloseButton}
      isDestructive={isDestructive}
      actionLabel={actionLabel}
      onAction={onAction}
      classNames={{
        container: cn(
          "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50 mb-3",
          classNames?.container,
        ),
        title: cn(classNames?.title),
        description: cn("text-red-800", classNames?.title),
      }}
    />
  );
}
