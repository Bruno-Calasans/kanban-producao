"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Departament } from "@/types/database.type"
import { useState } from "react"
import Loader from "@/components/custom/Loader"
import ProductLogTable from "./ProductLogTable"
import useGetAllProductLogsByDepartament from "@/hooks/productLog/useGetAllProductLogsByDepartament"
import CreateProductDialog from "../product/dialogs/CreateProductDialog"


type ProductLogTabsProps = {
    departaments: Departament[]
}

export default function ProductLogTabs({ departaments }: ProductLogTabsProps) {
    const defaultDepartament = departaments[0]
    const [selectedTab, setSelectedTab] = useState<string>(defaultDepartament.name)
    const selectedDepartament = departaments.find(departament => departament.name == selectedTab)
    const { data, isLoading, error } = useGetAllProductLogsByDepartament(selectedDepartament?.id)
    const productLogs = data?.data || []


    if (isLoading) {
        return (
            <section>
                <Loader title="Carregando registros dos produtos..." />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <p>Ocorreu um erro ao carregar registro dos produtos do departamento {selectedDepartament?.name}.</p>
            </section>
        )
    }

    return <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        defaultValue={defaultDepartament.name}
        className="w-full"
    >
        <div className="flex justify-between">
            <TabsList>
                {departaments.map(departament => (
                    <TabsTrigger className="m-2" key={departament.id} value={departament.name}>
                        {departament.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            <CreateProductDialog />
        </div>

        {departaments.map(departament => (
            <TabsContent key={departament.id} value={departament.name}>
                <ProductLogTable productLogs={productLogs} />
            </TabsContent>
        ))}
    </Tabs>
}