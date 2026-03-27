import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments"
import { Departament } from "@/types/database.type"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loader from "./Loader"

type DepartamentSelectorProps = {
    name: string
    value?: Departament | null
    onvalueChange(departament: Departament): void
}


export default function DepartamentSelector({ name, value, onvalueChange }: DepartamentSelectorProps) {
    const { data, isPending } = useGetAllDepartaments()
    const departaments = data ? data.data : []

    const handleValueChange = (dptName: string) => {
        const foundDepartament = departaments.find(dpt => dpt.name.toLocaleUpperCase() == dptName.toLocaleUpperCase())
        onvalueChange(foundDepartament!)
    }

    if (isPending) return <Loader className="text-sm" title="Carregando departamentos..." />

    return (<Select
        name={name}
        value={value ? value.name : ""}
        onValueChange={handleValueChange}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder="Selecione o departamento" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
            {departaments && departaments.map(dpt => (
                <SelectItem key={dpt.id} value={dpt.name}>{dpt.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>


    )
}