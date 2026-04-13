"use client"

import ReformedProductionFlowSelector from "@/components/custom/selectors/ReformedProductionFlowSelector"
import { SelectorItem, SingleSelector } from "@/components/custom/selectors/SingleSelector"
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments"
import { Departament } from "@/types/database.type"
import { useEffect, useState } from "react"

type DepartamentSelectorProps = {
    defaultDepartament?: Departament
    onChange: (departament?: Departament) => void
}


export default function TestPage({ defaultDepartament, onChange }: DepartamentSelectorProps) {
    return (
        <ReformedProductionFlowSelector />
    )

}