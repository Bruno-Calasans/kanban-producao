"use client";

import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

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
  currentDate?: Date;
  onChangeDate?: (date?: Date) => void;
  placeholder?: string;
};

export function DatePickerInput({ currentDate, placeholder, onChangeDate }: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(currentDate);
  const [value, setValue] = useState(formatDate(currentDate));
  const now = new Date();

  return (
    <Field className="mx-auto">
      {/* <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel> */}
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
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
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
            >
              <Calendar
                mode="single"
                selected={currentDate}
                locale={ptBR}
                lang="PtBr"
                startMonth={now}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setValue(formatDate(date));
                  setOpen(false);
                  onChangeDate && onChangeDate(date);
                }}
                disabled={{
                  before: now,
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
