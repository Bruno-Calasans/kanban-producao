import useGetAllProducts from "@/hooks/product/useGetAllProducts"
import { Product, ProductPopulated } from "@/types/database.type"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loader from "./Loader"

type ProductSelectorProps = {
    name: string
    selectedProduct?: ProductPopulated | null
    onvalueChange(product: ProductPopulated): void
}


export default function ProductSelector({ name, selectedProduct, onvalueChange }: ProductSelectorProps) {
    const { data, isPending } = useGetAllProducts()
    const products = data ? data.data : []

    const handleValueChange = (dptName: string) => {
        const foundProduct = products.find(dpt => dpt.name.toLocaleUpperCase() == dptName.toLocaleUpperCase())
        onvalueChange(foundProduct!)
    }

    if (isPending) return <Loader className="text-sm" title="Carregando produtos..." />

    return (<Select
        name={name}
        value={selectedProduct ? selectedProduct.name : ""}
        onValueChange={handleValueChange}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder="Selecione o produto" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
            {products && products.map(dpt => (
                <SelectItem key={dpt.id} value={dpt.name}>{dpt.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>


    )
}