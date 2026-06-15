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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
  CalendarIcon,
  CalendarMinus2Icon,
  CalendarDaysIcon,
  PackageIcon,
} from "lucide-react";
import CustomTooltip from "./CustomTooltip";

const items = [
  {
    name: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Produções",
    url: "/productions",
    icon: PackageIcon,
  },
  {
    name: "Fluxos de Produção",
    url: "/production-flows",
    icon: ArrowLeftRightIcon,
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

          {/* Calendário */}
          <SidebarMenuItem>
            {open ? (
              <SidebarMenuButton asChild className="w-full">
                <a href="/calendar" className="w-full">
                  <CalendarIcon />
                  <span>Calendário</span>
                </a>
              </SidebarMenuButton>
            ) : (
              <CustomTooltip content="Calendário" side="right">
                <SidebarMenuButton asChild className="w-full">
                  <a href="/calendar" className="w-full">
                    <CalendarIcon />
                    <span>Calendário</span>
                  </a>
                </SidebarMenuButton>
              </CustomTooltip>
            )}

            {/* Submenus */}
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a className="flex" href="/calendar/weekly">
                    <CalendarMinus2Icon />
                    <span>Semanal</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>

            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a className="flex" href="/calendar/monthly">
                    <CalendarDaysIcon />
                    <span>Mensal</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
