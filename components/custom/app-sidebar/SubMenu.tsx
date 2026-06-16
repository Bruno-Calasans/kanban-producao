import { MenuItem } from "./MenuItem";
import { MenuItemContent } from "./appSideType";
import {
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import SubItem from "./SubItem";

type SubMenuProps = {
  open?: boolean;
  mainItem: MenuItemContent;
  subItems: MenuItemContent[];
};

export default function SubMenu({ mainItem, subItems, open }: SubMenuProps) {
  return (
    <>
      <MenuItem open={open} item={mainItem} />
      <SidebarMenuItem>
        {subItems.map((item) => (
          <SidebarMenuSub key={item.name}>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <a className="flex" href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        ))}
      </SidebarMenuItem>
    </>
  );
}
