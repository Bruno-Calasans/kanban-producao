"use client";

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import ProductInfoHeader from "@/components/product/ProductInfoHeader";
import ProductInfoTabs from "@/components/product/ProductInfoTabs";
import useGetOneProduct from "@/hooks/product/useGetOneProduct";
import { useParams } from "next/navigation";

export default function ProductInfoPage() {
  const params = useParams<{ product_id: string }>();
  const { data, error, isPending } = useGetOneProduct(Number(params.product_id));
  const product = data?.data;

  if (isPending) return <Loader title="Carregando produto..." />;

  if (error)
    return (
      <section className="flex flex-col gap-2">
        <div>
          <PageTitle>Erro ao carregar produto</PageTitle>
          <p>Desculpe, mas não foi possível carregar este produto.</p>
        </div>
        <div>
          <BackButton to="/products" label="Voltar à página de produtos" />
        </div>
      </section>
    );

  if (!product)
    return (
      <section className="flex flex-col gap-2">
        <div>
          <PageTitle>Erro: produto não encontrado</PageTitle>
          <p>O produto que você está procurando não foi encontrado.</p>
          <p>Verifique se a URL está correta ou se o produto existe.</p>
        </div>
        <div>
          <BackButton to="/products" label="Voltar à página de produtos" />
        </div>
      </section>
    );

  return (
    <section>
      <ProductInfoHeader product={product} />
      <ProductInfoTabs product={product} />
    </section>
  );
}
