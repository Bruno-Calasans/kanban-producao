"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarGroupContent
} from "@/components/ui/sidebar"

import {
    HomeIcon,
    ArrowLeftRightIcon,
    ShirtIcon,
    FactoryIcon,
    CogIcon,
    BriefcaseBusinessIcon,
    Settings2Icon,
    FileClockIcon,
    Plus,
    FormIcon
} from "lucide-react"

const items = [
    {
        name: "Resumo",
        url: "/",
        icon: HomeIcon,
    },
    {
        name: "Execução de Processo",
        url: "/process-executation",
        icon: FileClockIcon,
    },
    {
        name: "Movimentação",
        url: "/movimentation",
        icon: ArrowLeftRightIcon,
    },
    {
        name: "Fluxo de Produção",
        url: "/production-flow",
        icon: FormIcon,
    },
    {
        name: "Produto",
        url: "/product",
        icon: ShirtIcon,
    },
    {
        name: "Departamento",
        url: "/departament",
        icon: FactoryIcon,
    },
    {
        name: "Processo",
        url: "/process",
        icon: CogIcon,
    },
    {
        name: "Responsável",
        url: "/responsible",
        icon: BriefcaseBusinessIcon,
    },
    {
        name: "Configuração",
        url: "/configuration",
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

            {/* <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupAction>
                    <Plus /> <span className="sr-only">Add Project</span>
                </SidebarGroupAction>
                <SidebarGroupContent>
                    <p>teste</p>
                </SidebarGroupContent>
            </SidebarGroup> */}

            <SidebarFooter />
        </Sidebar>
    )
}