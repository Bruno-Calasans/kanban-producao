
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

type ProcessSelectorProps = {
    name: string
    selectedDepartament?: Departament
    selectedProcess?: Process
    disabled?: boolean
    onValueChange(process: Process): void
}


export default function DepartamentProcessSelector({ name, selectedDepartament, selectedProcess, disabled, onValueChange }: ProcessSelectorProps) {
    const { data, isPending, status } = useGetAllProcessesByDepartamentId(selectedDepartament?.id)
    const processes = data?.data || []
    const defaultProcess = selectedProcess ?
        selectedProcess :
        processes.find(prc => prc.is_default)


    const handleValueChange = (processName: string) => {
        const foundProcess = processes
            .find(process => process.name.toLocaleUpperCase() == processName.toLocaleUpperCase())
        onValueChange(foundProcess!)
    }

    useEffect(() => {
        if (status === "success" && defaultProcess) {
            onValueChange(defaultProcess)
        }
    }, [status])


    if (isPending) return <Loader className="text-sm" title="Carregando processos..." />

    return (<Select
        name={name}
        value={defaultProcess?.name || ""}
        onValueChange={handleValueChange}
        disabled={disabled}
    >
        <SelectTrigger
            className="min-w-30"
        >
            <SelectValue placeholder="Selecione o processo" />
        </SelectTrigger>

        <SelectContent position="item-aligned">
            {processes && processes.map(process => (
                <SelectItem key={process.id} value={process.name}>{process.name}</SelectItem>
            ))}
        </SelectContent>
    </Select>


    )
}