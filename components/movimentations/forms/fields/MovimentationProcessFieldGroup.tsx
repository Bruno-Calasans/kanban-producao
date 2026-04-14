import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import DepartamentProcessSelector from "@/components/custom/DepartamentProcessSelector";
import { ArrowRightIcon } from "lucide-react";
import { Departament, Process, ProductPopulated } from "@/types/database.type";

type MovimentationProcessFieldGroupProps = {
  selectedProduct?: ProductPopulated;
  departamentOrigin: Departament;
  departamentDestination: Departament;
  processOrigin?: Process;
  processDestination?: Process;
  onChangeProcessOrigin: (process?: Process) => void;
  onChangeProcessDestination: (process?: Process) => void;
};

export const MovimentationProcessFieldGroup = withForm({
  defaultValues: defaultMovimentationFormValues,
  props: {} as MovimentationProcessFieldGroupProps,
  render({
    form,
    selectedProduct,
    departamentOrigin,
    departamentDestination,
    processOrigin,
    processDestination,
    onChangeProcessOrigin,
    onChangeProcessDestination,
  }) {
    return (
      <FieldSet>
        <FieldLegend>Processo</FieldLegend>
        <FieldGroup
          id="origin-process-movimentation-form"
          className="flex-row justify-center items-center"
        >
          {/* Campo: processo do departamento de origem*/}
          <form.Field
            name="processOriginName"
            children={(field) => {
              const defaultProcess = selectedProduct?.process
                ? selectedProduct.process
                : processOrigin;

              const isSameDepartament =
                departamentOrigin &&
                departamentDestination &&
                departamentOrigin.id === departamentDestination.id;

              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Processo de origem</FieldLabel>
                  <DepartamentProcessSelector
                    disabled
                    name={field.name}
                    selectedDepartament={departamentOrigin}
                    selectedProcess={defaultProcess}
                    onValueChange={(process) => {
                      field.handleChange(process?.name || "");
                      onChangeProcessOrigin(process);
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <ArrowRightIcon size={50} />

          {/* Campo: processo do departamento de destino*/}
          <form.Field
            name="processDestinationName"
            children={(field) => {
              const excludeProcess = selectedProduct?.process || undefined;
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Processo de destino</FieldLabel>
                  <DepartamentProcessSelector
                    name={field.name}
                    selectedDepartament={departamentDestination}
                    selectedProcess={processDestination}
                    excludeProcess={excludeProcess}
                    onValueChange={(process) => {
                      field.handleChange(process?.name || "");
                      onChangeProcessDestination(process);
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </FieldSet>
    );
  },
});
