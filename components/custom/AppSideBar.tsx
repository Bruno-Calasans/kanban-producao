"use client";

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
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  HomeIcon,
  ArrowLeftRightIcon,
  ShirtIcon,
  FactoryIcon,
  CogIcon,
  BriefcaseBusinessIcon,
  Settings2Icon,
  FormIcon,
} from "lucide-react";
import CustomTooltip from "./CustomTooltip";

const items = [
  {
    name: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Movimentações",
    url: "/movimentations",
    icon: ArrowLeftRightIcon,
  },
  {
    name: "Fluxos de Produção",
    url: "/production-flows",
    icon: FormIcon,
  },
  {
    name: "Produtos",
    url: "/products",
    icon: ShirtIcon,
  },
  {
    name: "Departamentos",
    url: "/departaments",
    icon: FactoryIcon,
  },
  {
    name: "Processos",
    url: "/processes",
    icon: CogIcon,
  },
  {
    name: "Responsáveis",
    url: "/responsibles",
    icon: BriefcaseBusinessIcon,
  },
  {
    name: "Configuração",
    url: "/configuration",
    icon: Settings2Icon,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="p-2">
        <SidebarMenu>
          {items.map((item) =>
            open ? (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <CustomTooltip key={item.name} content={item.name} side="right">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CustomTooltip>
            ),
          )}
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
  );
}
