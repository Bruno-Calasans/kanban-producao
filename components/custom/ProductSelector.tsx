import { Product } from "@/types/database.type";
import useGetAllActiveProducts from "@/hooks/product/useGetAllActiveProducts";
import { SearchableSelector } from "./selectors/SearchableSelector";

type ProductSelectorProps = {
  selectedProduct?: Product;
  defaultProduct?: Product;
  disabled?: boolean;
  onChangeProduct(product?: Product): void;
};

export default function ProductSelector({
  selectedProduct,
  defaultProduct,
  disabled,
  onChangeProduct,
}: ProductSelectorProps) {
  const { data, isPending } = useGetAllActiveProducts();
  const products = data ? data.data : [];

  return (
    <SearchableSelector<Product>
      data={products}
      selectedData={selectedProduct}
      defaultData={defaultProduct}
      labelSelector="name"
      onChange={onChangeProduct}
      isLoading={isPending}
      loadingMsg="Carregando produtos..."
      placeholder="Escolha um produto"
      noItemFoundMsg="Nenhum produto encontrado"
      disabled={disabled}
    />
  );
}
