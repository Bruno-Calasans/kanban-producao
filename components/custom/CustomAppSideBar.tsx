import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useLocalSideBar } from "@/hooks/local-storage/useLocalSideBar";
import { useEffect } from "react";

export function CustomAppSideBar() {
  const { open, setOpen } = useSidebar();
  const { isOpen, setOpen: setLocalOpen } = useLocalSideBar();

  const onToggleSideBar = () => {
    setOpen(!open);
    setLocalOpen(!open);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return <SidebarTrigger className="" onClick={onToggleSideBar} />;
}
