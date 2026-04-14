import { ProductWithProductionFlow } from "@/types/database.type";
import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProcessExecutationsByProduct from "@/hooks/process-executation/useGetAllProcessExecutionsByProduct";
import ProcessExecutationTable from "../tables/ProcessExecutationTable";

type ProductProcessExecutationsTabProps = {
  product: ProductWithProductionFlow;
};

export default function ProductProcessExecutationsTab({
  product,
}: ProductProcessExecutationsTabProps) {
  const { data, error, isPending } = useGetAllProcessExecutationsByProduct(product.id);
  const processExecutations = data?.data || [];

  if (isPending) {
    return (
      <section>
        <PageTitle>Processos</PageTitle>
        <Loader title="Carregando processos..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Processos</PageTitle>
        <p>Ocorreu um erro ao carregar os processos.</p>
      </section>
    );
  }
  return <ProcessExecutationTable processExecutations={processExecutations} />;
}
