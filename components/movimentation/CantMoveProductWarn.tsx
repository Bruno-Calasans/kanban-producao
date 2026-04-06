import { ProductPopulated } from "@/types/database.type"
import { Button } from "@/components/ui/button"
import EditProductDialog from "../product/dialogs/EditProductDialog"


type NoProductAmountWarnProps = {
    product: ProductPopulated
}


export default function CantMoveProductWarn({ product }: NoProductAmountWarnProps) {
    const hasAmount = product.max_amount && product.max_amount > 0
    const hasDepartament = product.departament !== null
    const hasProcess = product.process !== null
    const msg: React.ReactNode[] = []

    if (!hasAmount) {
        msg.push(<p className="text-md">Não tem  <span className="font-bold">nenhuma peça disponível</span> para movimentar.</p>)
    }

    if (!hasDepartament) {
        msg.push(<p className="text-md">Não definiu <span className="uppercase font-bold">departamento inicial</span></p>)
    }

    if (!hasProcess) {
        msg.push(<p className="text-md">Não definiu <span className="uppercase font-bold">processo inicial</span></p>)
    }


    if (msg.length > 0) {
        return (
            <div className="flex flex-col gap-1">
                <p className="font-bold text-lg p-0 m-0">Não é possível movimentar este produto ainda.</p>
                <ul className="list-disc ml-4">
                    {msg.map((msg, i) => (
                        <li className="ml-5" key={i}>{msg}</li>
                    ))}
                </ul>

                <EditProductDialog product={product} >
                    <Button
                        className="text-indigo-500 self-start cursor-pointer p-0"
                        variant="link">
                        Editar produto
                    </Button>
                </EditProductDialog >
            </div >

        )

    }

    return null
}