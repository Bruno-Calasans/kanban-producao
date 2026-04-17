"use client";

import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import ProductInfoHeader from "@/components/product/ProductInfoHeader";
import ProductInfoTabs from "@/components/product/ProductInfoTabs";
import useGetAllMovimentationsByProduct from "@/hooks/movimentation/useGetAllMovimentationsByProduct";
import useGetAllProcessExecutationsByProduct from "@/hooks/process-executation/useGetAllProcessExecutionsByProduct";
import useGetOneProduct from "@/hooks/product/useGetOneProduct";
import { useParams } from "next/navigation";

export default function ProductInfoPage() {
  const params = useParams<{ product_id: string }>();

  const {
    data: productData,
    error: productError,
    isPending: isProductPending,
  } = useGetOneProduct(Number(params.product_id));
  const product = productData?.data;

  const {
    data: productMovimentationData,
    error: productMovimentationError,
    isPending: isProductMovimentationsPending,
  } = useGetAllMovimentationsByProduct(product?.id);
  const movimentations = productMovimentationData?.data || [];

  const {
    data: executionsData,
    error: executionsError,
    isPending: isExecutionsPending,
  } = useGetAllProcessExecutationsByProduct(product?.id);
  const executions = executionsData?.data || [];

  const isError = productError || productMovimentationError || executionsError;
  const isPending = isProductMovimentationsPending || isProductPending || isExecutionsPending;

  if (isPending) return <Loader title="Carregando produto..." />;

  if (isError)
    return (
      <PageMsg
        title="Erro ao carregar o produto"
        content="Desculpe, não foi possível carregar esse produto"
        backBtnUrl="/products"
        backBtnLabel="Voltar à página de produtos"
      />
    );

  if (!product)
    return (
      <PageMsg
        title="Produto não encontrado"
        content={
          <div>
            <p>O produto que você está procurando não foi encontrado.</p>
            <p>Verifique se a URL está correta ou se o produto existe.</p>
          </div>
        }
        backBtnUrl="/products"
        backBtnLabel="Voltar à página de produtos"
      />
    );

  return (
    <section>
      <ProductInfoHeader product={product} movimentations={movimentations} />
      <ProductInfoTabs product={product} movimentations={movimentations} executions={executions} />
    </section>
  );
}
