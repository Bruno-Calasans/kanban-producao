import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useDeleteProductionFlow from "@/hooks/production-flow/useDeleteProductionFlow"
import { toast } from "sonner"
import useDialog from "@/hooks/dialog/useDialog"
import type { ProductionFlow } from "@/types/database.type"
import handleFormError from "@/utils/errorHandler"


type DeleteProductionFlowDialogProps = {
    productionFlow: ProductionFlow
    children?: React.ReactNode
}


export default function DeleteProductionFlowDialog({ productionFlow, children }: DeleteProductionFlowDialogProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useDeleteProductionFlow()


    const handleDelete = async () => {
        try {
            await mutateAsync({ id: productionFlow.id })
            toast.success("Fluxo de produção excluído com sucesso!")
            closeDialog("delete-production-flow")

        } catch (error) {
            handleFormError(error, {
                default: "Erro: Não foi possível excluir o fluxo de produção. Tente novamente."
            })
        }

    }

    return <CustomDialog
        id="delete-production-flow"
        title="Excluir fluxo de produção"
        trigger={children}>

        <div className="flex flex-col gap-2">
            <p>
                Tem certeza que deseja excluir o fluxo de produção <strong>{productionFlow.name}</strong>?
            </p>
            <p>
                Essa ação não pode ser desfeita.
            </p>
            <p></p>
            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <CancelButton isLoading={isPending} />
                <DeleteButton isLoading={isPending}
                    onclick={handleDelete}
                />
            </div>
        </div>
    </CustomDialog>
}