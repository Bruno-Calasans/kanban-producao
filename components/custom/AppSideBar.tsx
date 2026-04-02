"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    HomeIcon,
    ArrowLeftRightIcon,
    ShirtIcon,
    FactoryIcon,
    CogIcon,
    BriefcaseBusinessIcon,
    Settings2Icon
} from "lucide-react"

const items = [
    {
        name: "Resumo",
        url: "/",
        icon: HomeIcon,
    },
    {
        name: "Movimentação",
        url: "/movimentacao",
        icon: ArrowLeftRightIcon,
    },
    {
        name: "Produto",
        url: "/produto",
        icon: ShirtIcon,
    },
    {
        name: "Departamento",
        url: "/departamento",
        icon: FactoryIcon,
    },
    {
        name: "Processo",
        url: "/processo",
        icon: CogIcon,
    },
    {
        name: "Responsável",
        url: "/responsavel",
        icon: BriefcaseBusinessIcon,
    },
    {
        name: "Configuração",
        url: "/configuracao",
        icon: Settings2Icon,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}