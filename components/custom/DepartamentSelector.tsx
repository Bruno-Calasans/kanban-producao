"use client"

import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments"
import { Departament } from "@/types/database.type"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loader from "./Loader"
import { useEffect } from "react"

type DepartamentSelectorProps = {
    name: string
    selectedDepartament?: Departament | null
    placeHolder?: string
    disabled?: boolean
    sortByOrder?: boolean
    onBeforeValueChange?: (departaments: Departament[], departament?: Departament) => Departament | undefined
    onValueChange: (departament: Departament | undefined) => void

}

function sortDepartamentByOrder(dptA: Departament, dptB: Departament) {
    return dptA.order > dptB.order
}


export default function DepartamentSelector({
    name,
    selectedDepartament,
    placeHolder,
    disabled,
    onBeforeValueChange,
    onValueChange
}: DepartamentSelectorProps) {

    const { data, isPending, status } = useGetAllDepartaments()
    const departaments = data ? data.data : []

    // Usa departamento padrão
    const defaultDepartament = selectedDepartament ?
        selectedDepartament :
        departaments.find(dpt => dpt.is_default)


    const getDepartament = (departamentName: string) => {
        return departaments
            .find(dpt => dpt.name.toLocaleUpperCase() == departamentName.toLocaleUpperCase())
    }


    const handleValueChange = (departamentName: string) => {
        const foundDepartament = getDepartament(departamentName)
        if (onBeforeValueChange)
            onValueChange(onBeforeValueChange(departaments, foundDepartament))
        else
            onValueChange(foundDepartament!)
    }


    useEffect(() => {
        if (status === "success" && defaultDepartament) {
            onValueChange(defaultDepartament)
        }
    }, [status])


    if (isPending) return <Loader className="text-sm" title="Carregando departamentos..." />

    return (<Select
        name={name}
        value={defaultDepartament?.name || ""}
        onValueChange={handleValueChange}
        disabled={disabled}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder={placeHolder || "Selecione o departamento"} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
            {departaments && departaments.map(dpt => (
                <SelectItem key={dpt.id} value={dpt.name}>{dpt.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>
    )
}