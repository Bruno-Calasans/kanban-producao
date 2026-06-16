import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { MenuItemContent } from "./appSideType";
import CustomTooltip from "@/components/custom/CustomTooltip";

type MenuItemProps<T> = {
  open?: boolean;
  item: MenuItemContent;
};

export function MenuItem<T>({ open, item }: MenuItemProps<T>) {
  if (open)
    return (
      <SidebarMenuItem id="menu-item" key={item.name}>
        <SidebarMenuButton asChild>
          {item.url ? (
            <a href={item.url}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          ) : (
            <p className="cursor-default">
              <item.icon />
              <span>{item.name}</span>
            </p>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );

  return (
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
  );
}
