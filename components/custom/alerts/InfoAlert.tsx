import { InfoIcon } from "lucide-react";
import { CustomAlert, CustomAlertProps } from "./CustomAlert";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type InfoAlertProps = CustomAlertProps;

export function InfoAlert({
  title,
  description,
  alertIcon,
  hideCloseButton,
  closeIcon,
  classNames,
  isDestructive,
  actionLabel,
  onAction,
}: InfoAlertProps) {
  return (
    <CustomAlert
      title={title}
      description={description}
      alertIcon={alertIcon || <InfoIcon />}
      closeIcon={closeIcon}
      hideCloseButton={hideCloseButton}
      isDestructive={isDestructive}
      actionLabel={actionLabel}
      onAction={onAction}
      classNames={{
        container: cn(
          "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-50 mb-0",
          classNames?.container,
        ),
        title: cn(classNames?.title),
        description: cn("text-indigo-800", classNames?.title),
      }}
    />
  );
}
