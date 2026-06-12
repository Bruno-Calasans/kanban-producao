/* eslint-disable react/no-children-prop */
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { defaultMoveExternalFormValues, withForm } from "../moveExternalFormContext";
import { Departament } from "@/types/database.type";
import { SingleSelector } from "@/components/custom/selectors/SingleSelector";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";

type ExternalDepartamentFieldProps = {
  departaments: Departament[];
  defaultDepartament?: Departament;
  selectedDepartament?: Departament;
  isLoading?: boolean;
  onChangeDepartament: (departament?: Departament) => void;
};

export const ExternalDepartamentField = withForm({
  defaultValues: defaultMoveExternalFormValues,
  props: {} as ExternalDepartamentFieldProps,
  render({
    form,
    departaments,
    defaultDepartament,
    selectedDepartament,
    isLoading,
    onChangeDepartament,
  }) {
    return (
      <form.Field
        name="externalDepartamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Departamento
                <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelector<Departament>
                labelSelector="name"
                data={departaments}
                defaultData={defaultDepartament}
                selectedData={selectedDepartament}
                isLoading={isLoading}
                loadingMsg="Carregando departamentos externos..."
                placeholder="Selecione o departamento"
                noItemFoundMsg={<p>Nenhum departamento externo cadastrado</p>}
                onChange={(departamento) => {
                  field.handleChange(departamento?.name || "");
                  onChangeDepartament(departamento);
                }}
              />
              <FieldDescription>Seleciona para qual departamento deseja enviar</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
