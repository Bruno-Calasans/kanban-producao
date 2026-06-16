import { SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { MenuItemContent } from "./appSideType";

type SubItemProps = {
  item: MenuItemContent;
};

export default function SubItem({ item }: SubItemProps) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <a className="flex" href={item.url}>
          <item.icon />
          <span>{item.name}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
