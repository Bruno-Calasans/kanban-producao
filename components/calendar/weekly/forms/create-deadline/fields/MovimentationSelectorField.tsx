/* eslint-disable react/no-children-prop */
import { Field } from "@/components/ui/field";
import { defaultCreateDeadlineForm, withForm } from "../createDeadlineFormContext";
import { FieldError, FieldLabel, FieldDescription } from "@/components/ui/field";
import { MovimentationPopulated } from "@/types/database.type";
import RequiredFieldTooltip from "@/components/custom/RequiredFieldTooltip";
import MovimentationSelector from "@/components/custom/selectors/MovimentationSelector";

type MovimentationSelectorFieldProps = {
  avaliableMovimentations: MovimentationPopulated[];
  selectedMovimentation?: MovimentationPopulated;
  onChangeMovimentation: (movimentation?: MovimentationPopulated) => void;
};

export const MovimentationSelectorField = withForm({
  defaultValues: defaultCreateDeadlineForm,
  props: {} as MovimentationSelectorFieldProps,
  render({ form, avaliableMovimentations, selectedMovimentation, onChangeMovimentation }) {
    return (
      <form.Field
        name="productMovimentation"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field>
              <FieldLabel className="gap-0" htmlFor={field.name}>
                Movimentação <RequiredFieldTooltip />
              </FieldLabel>
              <MovimentationSelector
                movimentations={avaliableMovimentations}
                selectedMovimentation={selectedMovimentation}
                onValueChange={(movimentation) => {
                  field.setValue(movimentation ? movimentation.product.name : "");
                  onChangeMovimentation(movimentation);
                }}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
              <FieldDescription>
                Selecione a movimentação para poder definir o prazo do departamento.
              </FieldDescription>
            </Field>
          );
        }}
      />
    );
  },
});
