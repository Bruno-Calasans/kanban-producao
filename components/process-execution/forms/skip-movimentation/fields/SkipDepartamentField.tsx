import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Departament } from "@/types/database.type";
import { defaultSkipMovimentationFormValues, withForm } from "../skipMovimentationFormContext";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import { SingleSelector } from "@/components/custom/selectors/SingleSelector";

type SkipDepartamentFieldProps = {
  selectedDepartament?: Departament;
  avaliableDepartaments: Departament[];
  onChangeDepartament: (process?: Departament) => void;
};

export const SkipDepartamentField = withForm({
  defaultValues: defaultSkipMovimentationFormValues,
  props: {} as SkipDepartamentFieldProps,
  render({ form, avaliableDepartaments, selectedDepartament, onChangeDepartament }) {
    return (
      <form.Field
        name="departamentName"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Processo <RequiredFieldTooltip />
              </FieldLabel>
              <SingleSelector<Departament>
                data={avaliableDepartaments}
                placeholder="Selecione o departament"
                labelSelector="name"
                selectedData={selectedDepartament}
                onChange={(departament) => {
                  field.handleChange(departament?.name || "");
                  onChangeDepartament(departament);
                }}
              />
              <FieldDescription>Escolhe para qual processo você quer pular</FieldDescription>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      ></form.Field>
    );
  },
});
