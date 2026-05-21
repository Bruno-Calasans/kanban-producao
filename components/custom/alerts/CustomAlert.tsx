import { AlertCircleIcon, XIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type CustomAlertProps = {
  title: string;
  description: React.ReactNode;
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

export function CustomAlert({
  title,
  description,
  hideCloseButton,
  closeIcon,
  classNames,
  alertIcon,
  close,
  isDestructive,
  actionLabel,
  onAction,
}: CustomAlertProps) {
  const [defaultClose, setDefaultClose] = useState(false);

  return (
    <Alert
      variant={isDestructive ? "destructive" : "default"}
      hidden={close != undefined ? close : defaultClose}
      className={cn(
        "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50",
        classNames?.container,
      )}
    >
      {alertIcon || <AlertCircleIcon />}
      <AlertTitle className={cn("font-bold", classNames?.title)}>{title}</AlertTitle>
      <AlertDescription className={cn("", classNames?.description)}>{description}</AlertDescription>
      {!hideCloseButton &&
        !actionLabel &&
        (closeIcon || (
          <XIcon
            onClick={() => setDefaultClose(true)}
            className="absolute right-2 top-2 text-red-500"
          />
        ))}

      {actionLabel && (
        <AlertAction onClick={() => onAction && onAction()}>{actionLabel}</AlertAction>
      )}
    </Alert>
  );
}
