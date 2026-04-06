
"use client"

import { Departament, Process } from "@/types/database.type"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loader from "./Loader"
import useGetAllProcessesByDepartamentId from "@/hooks/process/useGetAllProcessesByDepartament"
import { useEffect } from "react"
import { sortByOrder } from "@/utils/sortByOrder"
import { Button } from "../ui/button"

type ProcessSelectorProps = {
    name: string
    selectedDepartament?: Departament
    selectedProcess?: Process
    disabled?: boolean
    excludeProcess?: Process
    onValueChange(process: Process | undefined): void
}


export default function DepartamentProcessSelector({
    name,
    selectedDepartament,
    selectedProcess,
    disabled,
    excludeProcess,
    onValueChange
}: ProcessSelectorProps) {

    const { data, isPending, status } = useGetAllProcessesByDepartamentId(selectedDepartament?.id)
    const processes = data?.data || []

    const filterProcesses = () => {
        const sortedProcesses = processes.sort(sortByOrder)

        const filteredProcesses = excludeProcess ?
            sortedProcesses.filter(p => p.id != excludeProcess.id && p.order > excludeProcess.order) :
            sortedProcesses

        return filteredProcesses
    }

    const getCurrentProcess = () => {
        const defaultDepartament = filteredProcesses.find(process => process.is_default)

        if (selectedProcess && processes.length > 0) return selectedProcess

        if (defaultDepartament) return defaultDepartament

        if (filteredProcesses.length > 0) return filteredProcesses[0]

        return undefined
    }

    const handleValueChange = (processName: string) => {
        const foundProcess = filteredProcesses
            .find(process => process.name.toLocaleUpperCase() == processName.toLocaleUpperCase())
        onValueChange(foundProcess!)
    }

    const filteredProcesses = filterProcesses()
    const currentProcess = getCurrentProcess()

    useEffect(() => {
        if (status === "success") {
            onValueChange(currentProcess)
        }

    }, [status, selectedDepartament?.id])


    if (isPending) return <Loader className="text-sm" title="Carregando processos..." />

    return (<Select
        name={name}
        value={currentProcess?.name || ""}
        onValueChange={handleValueChange}
        disabled={disabled}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder={processes.length == 0 ? "Nenhum processo" : "Selcione o processo"} />
        </SelectTrigger>

        <SelectContent position="item-aligned">
            {filteredProcesses && filteredProcesses.map(process => (
                <SelectItem key={process.id} value={process.name}>{process.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>


    )
}