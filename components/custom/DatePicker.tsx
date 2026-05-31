"use client";

import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

function formatDate(date: Date | string | undefined) {
  if (!date) {
    return "";
  }

  date = new Date(date);

  return date.toLocaleDateString("pt-Br", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

type DatePickerInputProps = {
  currentDate?: Date | string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
  weekDays?: number[];
  onChangeDate?: (date?: Date) => void;
};

export function DatePickerInput({
  currentDate,
  placeholder,
  disabled,
  minDate,
  maxDate,
  weekDays,
  onChangeDate,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | string | undefined>(currentDate);
  const [value, setValue] = useState(formatDate(currentDate));
  const now = new Date();

  useEffect(() => {
    setMonth(currentDate);
    setValue(formatDate(currentDate));
  }, [currentDate]);

  return (
    <Field className="mx-auto">
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder={placeholder || "Selecione uma data"}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open && !disabled} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Selecione a data</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
              side="top"
              onFocusOutside={(e) => e.preventDefault()}
            >
              <Calendar
                mode="single"
                selected={currentDate as Date | undefined}
                locale={ptBR}
                lang="PtBr"
                startMonth={now}
                month={month as Date | undefined}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setValue(formatDate(date));
                  setOpen(false);
                  onChangeDate && onChangeDate(date);
                }}
                disabled={(date: Date) => {
                  let isDisable = false;

                  // Por padrão, removi domingo dos dias permitidos
                  const permittedWeekDays = weekDays || [1, 2, 3, 4, 5, 6];
                  const isNotPermitted = !permittedWeekDays.includes(date.getDay());

                  if (minDate) {
                    const convertedDate = typeof minDate === "string" ? new Date(minDate) : minDate;
                    isDisable = date.getTime() < convertedDate.getTime() || isNotPermitted;
                  }

                  if (maxDate) {
                    const convertedDate = typeof maxDate === "string" ? new Date(maxDate) : maxDate;
                    isDisable = date.getTime() > convertedDate.getTime() || isNotPermitted;
                  }

                  if (!minDate && !maxDate) {
                    isDisable = isNotPermitted;
                  }

                  return isDisable;
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
