"use client";

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import ProductDetailsTabs from "@/components/product/tabs/ProductDetailsTabs";
import useGetOneProduct from "@/hooks/product/useGetOneProduct";
import { useParams } from "next/navigation";

export default function ProductInfoPage() {
  const params = useParams<{ product_id: string }>();
  const { data, isPending } = useGetOneProduct(Number(params.product_id));
  const product = data?.data;

  if (isPending) return <Loader title="Carregando produto..." />;

  if (!product)
    return (
      <section>
        <PageTitle>Informações do produto</PageTitle>
        <p> Produto não encontrado</p>
      </section>
    );

  return (
    <section>
      <div className="flex justify-between">
        <PageTitle>Informações do Produto</PageTitle>
        <BackButton to="/product" label="Voltar à página de produtos" />
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <p>
          <strong>Produto:</strong> {product.name}
        </p>
        <p>
          <strong>Número de OP:</strong> {product.op}
        </p>
        <p>
          <strong>Fluxo de Produção:</strong> {product.production_flow.name}
        </p>
      </div>
      <ProductDetailsTabs product={product} />
    </section>
  );
}
