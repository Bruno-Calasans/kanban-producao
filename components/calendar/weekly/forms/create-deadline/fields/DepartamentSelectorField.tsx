/* eslint-disable react/no-children-prop */
import { Field } from "@/components/ui/field";
import { defaultCreateDeadlineForm, withForm } from "../createDeadlineFormContext";
import { FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import { SingleSelector } from "@/components/custom/selectors/SingleSelector";

type DepartamentSelectorFieldProps = {
  avaliableDepartaments: Departament[];
  selectedDepartament?: Departament;
  onChangeDepartament: (departament?: Departament) => void;
};

export const DepartamentSelectorField = withForm({
  defaultValues: defaultCreateDeadlineForm,
  props: {} as DepartamentSelectorFieldProps,
  render({ form, avaliableDepartaments, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="departamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Departamento <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelector<Departament>
                data={avaliableDepartaments}
                selectedData={selectedDepartament}
                defaultData={avaliableDepartaments[0]}
                labelSelector="name"
                onChange={onChangeDepartament}
                placeholder="Selecione o Departamento"
                loadingMsg="Carregando os departamentos..."
                noItemFoundMsg="Nenhum departamento encontrado."
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Selecione o departamento de origem pela execução do processo.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
