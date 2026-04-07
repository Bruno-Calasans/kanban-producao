"use client"

import useGetAllResponsibles from "@/hooks/responsible/useGetAllResponsibles"
import { Departament, Responsible, ResponsibleWithDepartament } from "@/types/database.type"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loader from "./Loader"
import { useEffect } from "react"
import { useGetAllResponsiblesByDepartament } from "@/hooks/responsible/useGetAllResponsiblesByDepartament"

type ResponsibleSelectorProps = {
    name: string
    selectedDepartament?: Departament
    selectedResponsible?: ResponsibleWithDepartament
    placeHolder?: string
    disabled?: boolean
    sortByOrder?: boolean
    onValueChange: (responsible?: ResponsibleWithDepartament) => void

}

export default function ResponsibleSelector({
    name,
    selectedDepartament,
    selectedResponsible,
    placeHolder,
    disabled,
    onValueChange
}: ResponsibleSelectorProps) {

    const { data, isPending, status } = useGetAllResponsiblesByDepartament(selectedDepartament?.id)
    const responsibles = data ? data.data : []

    const getCurrentResponsible = () => {
        if (selectedResponsible && responsibles.length > 0) return selectedResponsible
        if (responsibles.length > 0) return responsibles[0]
        return undefined
    }


    const getResponsible = (responsibleName: string) => {
        return responsibles
            .find(responsible => responsible.name.toLocaleUpperCase() == responsibleName.toLocaleUpperCase())
    }


    const handleValueChange = (responsibleName: string) => {
        const foundResponsible = getResponsible(responsibleName)
        onValueChange(foundResponsible)
    }

    const currentResponsible = getCurrentResponsible()

    useEffect(() => {
        if (status === "success") {
            onValueChange(currentResponsible)
        }
    }, [status, selectedDepartament?.id])


    if (isPending) return <Loader className="text-sm" title="Carregando responsáveis..." />

    return (<Select
        name={name}
        value={currentResponsible?.name || ""}
        onValueChange={handleValueChange}
        disabled={disabled}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder={responsibles.length > 0 ? placeHolder || "Selecione o responsável" : "Nenhum responsável"} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
            {responsibles && responsibles.map(dpt => (
                <SelectItem key={dpt.id} value={dpt.name}>{dpt.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>
    )
}