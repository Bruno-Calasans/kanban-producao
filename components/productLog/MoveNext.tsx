"use client"

import useGetNextProcesses from "@/hooks/process/useGetNextProcesses"
import Loader from "../custom/Loader"
import { Button } from "../ui/button"
import { ChevronRightIcon } from "lucide-react"
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation"
import { ProductPopulated } from "@/types/database.type"
import { toast } from "sonner"
import handleFormError from "@/utils/errorHandler"
import useDialog from "@/hooks/dialog/useDialog"
import MoveNextButton from "../custom/buttons/MoveNextButton"
import useGetNextDepartaments from "@/hooks/departament/useGetNextDepartaments"
import { getAllProcessesByDepartamentId } from "@/service/api/processApi"

type MoveNextProps = {
    product: ProductPopulated
}


export default function MoveNext({ product }: MoveNextProps) {
    const { data: nextProcesses, isPending: isProcessesPending } = useGetNextProcesses(product.id)
    const { data: nextDepartaments, isPending: isDepartamentPending } = useGetNextDepartaments(product.id)
    const { mutateAsync, isPending: isMovimentationPending } = useCreateMovimentation()
    const { closeDialog } = useDialog()


    const hasNextProcesses = nextProcesses && nextProcesses.length > 0
    const hasNextDepartaments = nextDepartaments && nextDepartaments.length > 0

    const nextProcess = nextProcesses ? nextProcesses[0] : null
    const nextDepartament = nextDepartaments ? nextDepartaments[0] : null

    const moveNextProcess = async () => {

        if (!nextProcesses || !nextProcess) return
        const { id, max_amount, process, departament } = product

        try {
            await mutateAsync({
                product_id: id,
                amount: max_amount,
                departament_origin_id: departament.id,
                departament_destination_id: departament.id,
                process_origin_id: process.id,
                process_destination_id: nextProcess.id
            })
            toast.success("Produto movido para próximo processo.")
            closeDialog("create-product-log")

        } catch (error) {
            handleFormError(error, {
                default: "Erro: não foi possível mover para próximo processo."
            })
        }

    }

    const moveNextDepartament = async () => {
        if (!nextDepartament) return
        const { id, max_amount, process, departament } = product

        try {

            const { data: departamentProcesses } = await getAllProcessesByDepartamentId(nextDepartament.id)
            if (!departamentProcesses || departamentProcesses.length == 0) {
                throw new Error(`Nenhum processo encontrado no departamento "${nextDepartament.name}"`)
            }
            const departamentProcess = departamentProcesses[0]
            await mutateAsync({
                product_id: id,
                amount: max_amount,
                departament_origin_id: departament.id,
                departament_destination_id: nextDepartament.id,
                process_origin_id: process.id,
                process_destination_id: departamentProcess.id
            })

        } catch (error) {
            console.log(error)
            handleFormError(error, {
                default: "Erro: não foi possível mover para próximo departamento.",
            })
        }

    }

    console.log(nextDepartaments)


    if (isProcessesPending) return <Loader title="Carregando próximo processos" />
    if (isDepartamentPending) return <Loader title="Carregando próximo departamentos" />


    if (hasNextProcesses && nextProcess)
        return (
            <div className="flex flex-col gap-4">
                <div>
                    <p>Você já terminou de processar esse produto.</p>
                    <p>Deseja movê-lo para o próximo processo?</p>
                </div>
                <MoveNextButton
                    label={`Mover próximo processo: ${nextProcess.name}`}
                    isLoading={isMovimentationPending}
                    loadingMsg="Movendo..."
                    onClick={moveNextProcess}
                />
            </div>
        )

    if (hasNextDepartaments && nextDepartament)
        return (
            <div className="flex flex-col gap-4">
                <div>
                    <p>Você chegou ao último processo deste departamento.</p>
                    <p>Deseja movê-lo para o próximo departamento?</p>
                </div>
                <MoveNextButton
                    label={`Mover próximo departamento: ${nextDepartament.name}`}
                    isLoading={isMovimentationPending}
                    loadingMsg="Movendo..."
                    onClick={moveNextDepartament}
                />
            </div>
        )

    return null

}