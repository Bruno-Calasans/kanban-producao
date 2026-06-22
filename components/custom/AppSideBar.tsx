"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  HomeIcon,
  ArrowLeftRightIcon,
  ShirtIcon,
  FactoryIcon,
  BriefcaseBusinessIcon,
  Settings2Icon,
  CalendarIcon,
  CalendarMinus2Icon,
  CalendarDaysIcon,
  PackageIcon,
  LayoutGridIcon,
} from "lucide-react";
import { MenuItem } from "./app-sidebar/MenuItem";
import SubMenu from "./app-sidebar/SubMenu";

const topMenu = [
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
];

const bottomMenu = [
  {
    name: "Configurações",
    url: "/configuration",
    icon: Settings2Icon,
  },
];

const paramentersSubmenu = {
  main: {
    name: "Parâmetros",
    // url: "/parameters",
    icon: LayoutGridIcon,
  },
  subs: [
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
      name: "Responsáveis",
      url: "/responsibles",
      icon: BriefcaseBusinessIcon,
    },
    {
      name: "Fluxos",
      url: "/production-flows",
      icon: ArrowLeftRightIcon,
    },
  ],
};

const calendarSubMenu = {
  main: {
    name: "Calendário",
    // url: "/calendars",
    icon: CalendarIcon,
  },
  subs: [
    {
      name: "Semanal",
      url: "/calendar/weekly",
      icon: CalendarMinus2Icon,
    },
    {
      name: "Mensal",
      url: "/calendar/monthly",
      icon: CalendarDaysIcon,
    },
  ],
};

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="p-2">
        <SidebarMenu>
          {/* Menu superior */}
          {topMenu.map((item) => (
            <MenuItem key={item.name} open={open} item={item} />
          ))}

          {/* Calendário Submenu */}
          <SubMenu open={open} mainItem={calendarSubMenu.main} subItems={calendarSubMenu.subs} />

          {/* Paramêtros submenu */}
          <SubMenu
            open={open}
            mainItem={paramentersSubmenu.main}
            subItems={paramentersSubmenu.subs}
          />

          {/* Menu */}
          {bottomMenu.map((item) => (
            <MenuItem key={item.name} open={open} item={item} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
