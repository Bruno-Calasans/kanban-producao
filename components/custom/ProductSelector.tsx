import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import { Product } from "@/types/database.type";
import { SingleSelector } from "./selectors/SingleSelector";

type ProductSelectorProps = {
  selectedProduct?: Product;
  defaultProduct?: Product
  onChangeProduct(product?: Product): void;
};

export default function ProductSelector({
  selectedProduct,
  defaultProduct,
  onChangeProduct,
}: ProductSelectorProps) {
  const { data, isPending } = useGetAllProducts();
  const products = data ? data.data : [];

  return (
    <SingleSelector<Product>
      data={products}
      selectedData={selectedProduct}
      defaultData={defaultProduct}
      labelSelector="name"
      onChange={onChangeProduct}
      isLoading={isPending}
      loadingMsg="Carregando produtos..."
      placeholder="Escolha um produto"
      noItemFoundMsg="Nenhum produto encontrado"
    />
  )
}
