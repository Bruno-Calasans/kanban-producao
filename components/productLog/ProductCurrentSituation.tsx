import { ProductPopulated } from "@/types/database.type"
import { FieldLegend, FieldSet } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import MoveNext from "./MoveNext"

type ProductCurrentSituationProps = {
    product: ProductPopulated
    totalAmountDone: number
}

export function ProductCurrentSituation({ product, totalAmountDone }: ProductCurrentSituationProps) {

    const hasAmount = product.max_amount > 0
    const IsDone = hasAmount && product.max_amount == totalAmountDone

    return (
        <FieldSet>
            <FieldLegend>Situação atual</FieldLegend>
            <div className="flex flex-row justify-between gap-2">
                <div>
                    <p className="font-bold">Departamento</p>
                    <Badge variant="default" className="rounded-md">{product.departament?.name}</Badge>
                </div>
                <div>
                    <p className="font-bold">Processo</p>
                    <Badge variant="default" className="rounded-md">{product.process?.name}</Badge>
                </div>
                <div>
                    <p className="font-bold">Quantidade</p>
                    <p>{totalAmountDone} / {product.max_amount}</p>
                </div>
            </div>
            {
                !hasAmount && (
                    <div className="flex flex-col gap-1 justify-start items-start">
                        <p>Nenhuma <span className="font-bold">quantidade disponível</span>.</p>
                        <p>Defina a quantidade do produto.</p>
                        <Button className="p-0 mt-0" variant="link">Editar produto</Button>
                    </div>
                )
            }
            {
                IsDone && <MoveNext product={product} />
            }
        </FieldSet>
    )
}