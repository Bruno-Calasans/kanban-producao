"use client"

import { FieldLegend, FieldSet, FieldDescription } from "@/components/ui/field";
import { defaultProductionFlowValues, withForm } from "../ProductionFlowFormContext";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxSeparator,
    ComboboxValue,
    useComboboxAnchor,

} from "@/components/ui/combobox"
import { useEffect, useState } from "react";
import useGetAllProcesses from "@/hooks/process/useGetAllProcesses";
import Loader from "@/components/custom/Loader";
import { Process, ProductionFlow } from "@/types/database.type";
import { sortBySequence } from "@/utils/sortByOrder";


type ComboItem = {
    label: string
    value: string
}

type GroupedItems = {
    value: string
    items: ComboItem[]
}

type ProductionFlowProcessesFieldProps = {

    productionflow?: ProductionFlow
    defautlSelectedProcesses?: Process[]
    onSelectedProcesses: (processes: Process[]) => void
}


export const ProductionFlowProcessesField = withForm({
    defaultValues: defaultProductionFlowValues,
    props: {} as ProductionFlowProcessesFieldProps,
    render({ form, productionflow, defautlSelectedProcesses, onSelectedProcesses }) {
        const anchor = useComboboxAnchor()
        const { data: processesData, isPending } = useGetAllProcesses()
        const [selectedProcesses, setSelectedProcesses] = useState<Process[]>(defautlSelectedProcesses || [])
        const processes = processesData?.data || []

        const groupItems = () => {
            const groups: GroupedItems[] = []
            processes.forEach(process => {
                const hasGroup = groups.find(group => group.value === process.departament.name)
                if (hasGroup) {
                    hasGroup.items.push({
                        label: formatProcess(process),
                        value: formatProcess(process)
                    })
                } else {
                    groups.push({
                        value: process.departament.name,
                        items: [{
                            label: formatProcess(process),
                            value: formatProcess(process)
                        }]
                    })
                }

            })

            return groups
        }

        const handleValueChange = (items: string[]) => {
            const processNames = items.map(item => item.split(" ")[1])
            const chosedProcesses = processes.filter(process => processNames.includes(process.name))
            onSelectedProcesses(chosedProcesses)
            setSelectedProcesses(chosedProcesses)
        }

        const formatProcess = (process: Process) => {
            return `(${process.sequence}) ${process.name}`
        }

        useEffect(() => {
            if (defautlSelectedProcesses) {
                onSelectedProcesses(defautlSelectedProcesses)
            }

        }, [])

        const groups = groupItems()

        if (isPending) return <Loader title="Carregando processos..." />

        return (
            <FieldSet>
                <FieldLegend>Processos</FieldLegend>
                <FieldDescription>Selecione os processos do seu fluxo de produção.
                    A ordem dos processos será de acordo com a sequência definida em cada processo.
                </FieldDescription>
                <Combobox
                    multiple
                    items={groups}
                    onValueChange={handleValueChange}
                    value={selectedProcesses.sort(sortBySequence).map(formatProcess)}
                >
                    <ComboboxChips
                        ref={anchor}
                        style={{
                            flexWrap: "wrap"
                        }}>
                        <ComboboxValue>
                            {selectedProcesses.map((item) => (
                                <ComboboxChip key={item.id}>{formatProcess(item)}</ComboboxChip>
                            ))}
                        </ComboboxValue>
                        <ComboboxChipsInput placeholder="Adicione processos" />
                    </ComboboxChips>

                    <ComboboxContent side="bottom" anchor={anchor}>
                        <ComboboxEmpty>Nenhum processo encontrado.</ComboboxEmpty>
                        <ComboboxList>
                            {(group: GroupedItems, index) => (
                                <ComboboxGroup key={group.value} items={group.items}>
                                    <ComboboxLabel>{group.value}</ComboboxLabel>
                                    <ComboboxCollection>
                                        {(item: ComboItem) => (
                                            <ComboboxItem key={item.label} value={item.value}>
                                                {item.label}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxCollection>
                                    {index < groups.length - 1 && <ComboboxSeparator />}
                                </ComboboxGroup>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </FieldSet >
        )

    }
})