"use client";

import { useParams } from "next/navigation";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import ProductInfoHeader from "@/components/product/ProductInfoHeader";
import ProductInfoTabs from "@/components/product/ProductInfoTabs";
import useGetAllProductionsByProduct from "@/hooks/production/useGetAllProductionsByProduct";
import useGetAllMovimentationsByProduct from "@/hooks/movimentation/useGetAllMovimentationsByProduct";
import useGetOneProduct from "@/hooks/product/useGetOneProduct";

export default function ProductInfoPage() {
  const params = useParams<{ product_id: string }>();

  const {
    data: productData,
    error: productError,
    isPending: isProductPending,
  } = useGetOneProduct(Number(params.product_id));
  const product = productData?.data;

  const {
    data: productionsData,
    error: productionsError,
    isPending: isProductionsPending,
  } = useGetAllProductionsByProduct(product?.id);
  const productions = productionsData?.data || [];

  const {
    data: movimentationsData,
    error: movimentationsError,
    isPending: isMovimentationsPending,
  } = useGetAllMovimentationsByProduct(product?.id);
  const movimentations = movimentationsData?.data || [];

  const isError = productError || productionsError || movimentationsError;
  const isPending = isProductionsPending || isProductPending || isMovimentationsPending;

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
      <ProductInfoHeader product={product} productions={productions} />
      <ProductInfoTabs
        product={product}
        productions={productions}
        movimentations={movimentations}
      />
    </section>
  );
}
