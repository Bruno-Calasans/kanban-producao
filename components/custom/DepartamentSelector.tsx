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
import { sortByOrder } from "@/utils/sortByOrder"

type DepartamentSelectorProps = {
    name: string
    selectedDepartament?: Departament | null
    placeHolder?: string
    disabled?: boolean
    sortByOrder?: boolean
    excludeDepartament?: Departament
    onValueChange: (departament: Departament | undefined) => void

}

export default function DepartamentSelector({
    name,
    selectedDepartament,
    placeHolder,
    disabled,
    excludeDepartament,
    onValueChange
}: DepartamentSelectorProps) {

    const { data, isPending, status } = useGetAllDepartaments()
    const departaments = data ? data.data : []

    const getCurrentDepartament = () => {
        const defaultDepartament = filteredDepartaments.find(process => process.is_default)

        if (selectedDepartament) return selectedDepartament

        if (defaultDepartament) return defaultDepartament

        if (filteredDepartaments.length > 0) return filteredDepartaments[0]

        return undefined
    }

    
    const filterDepartaments = () => {
        const sortedDepartaments = departaments.sort(sortByOrder)
        const filteredDepartaments = excludeDepartament ?
            sortedDepartaments
                .filter(d => d.id != excludeDepartament.id || d.order > excludeDepartament.order) :
            sortedDepartaments

        return filteredDepartaments
    }


    const getDepartament = (departamentName: string) => {
        return filteredDepartaments
            .find(dpt => dpt.name.toLocaleUpperCase() == departamentName.toLocaleUpperCase())
    }


    const handleValueChange = (departamentName: string) => {
        const foundDepartament = getDepartament(departamentName)
        onValueChange(foundDepartament!)
    }

    const filteredDepartaments = filterDepartaments()
    const currentDepartament = getCurrentDepartament()


    useEffect(() => {
        if (status === "success") {
            onValueChange(currentDepartament)
        }
    }, [status])


    if (isPending) return <Loader className="text-sm" title="Carregando departamentos..." />

    return (<Select
        name={name}
        value={currentDepartament?.name || ""}
        onValueChange={handleValueChange}
        disabled={disabled}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder={placeHolder || "Selecione o departamento"} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
            {filteredDepartaments && filteredDepartaments.map(dpt => (
                <SelectItem key={dpt.id} value={dpt.name}>{dpt.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>
    )
}