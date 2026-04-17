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
        <Loader title="Carregando execuções..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>Ocorreu um erro ao carregar as execuções.</p>
      </section>
    );
  }
  return (
    <ProcessExecutationTable hideMovimentationColumn processExecutions={processExecutations} />
  );
}
