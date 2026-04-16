import CreateProductionflowForm from "@/components/production-flow/forms/CreateProductionFlowForm";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";

export default function CreateProductionFlowPage() {
  return (
    <section>
      <div className="flex justify-between">
        <PageTitle>Criar Fluxo de Produção</PageTitle>
        <BackButton label="Voltar" to="/production-flows" />
      </div>
      <CreateProductionflowForm />
    </section>
  );
}
