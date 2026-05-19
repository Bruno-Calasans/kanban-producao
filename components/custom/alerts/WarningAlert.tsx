import { TriangleAlertIcon } from "lucide-react";
import { CustomAlert } from "./CustomAlert";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type WarningAlertProps = {
  title: string;
  description: string;
  alertIcon?: React.ReactNode;
  hideCloseButton?: boolean;
  closeIcon?: React.ReactNode;
  classNames?: {
    container?: ClassValue;
    title?: ClassValue;
    description?: ClassValue;
    action?: ClassValue;
  };
  close?: boolean;
  isDestructive?: boolean;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
};

export function WarningAlert({
  title,
  description,
  alertIcon,
  hideCloseButton,
  closeIcon,
  classNames,
  isDestructive,
  actionLabel,
  onAction,
}: WarningAlertProps) {
  return (
    <CustomAlert
      title={title}
      description={description}
      alertIcon={alertIcon || <TriangleAlertIcon />}
      closeIcon={closeIcon}
      hideCloseButton={hideCloseButton}
      isDestructive={isDestructive}
      actionLabel={actionLabel}
      onAction={onAction}
      classNames={{
        container: cn(
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50 mb-3",
          classNames?.container,
        ),
        title: cn(classNames?.title),
        description: cn("text-amber-800", classNames?.title),
      }}
    />
  );
}
