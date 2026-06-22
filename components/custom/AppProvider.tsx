"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import ContentContainer from "./ContentContainer";
import { Toaster } from "sonner";
import { AppSidebar } from "./AppSideBar";
import { DialogProvider } from "@/hooks/dialog/DialogContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { CustomAppSideBar } from "./CustomAppSideBar";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCalendarPath = pathname.includes("calendar");

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <CustomAppSideBar />
        <ContentContainer className={isCalendarPath ? "max-w-8xl" : undefined}>
          <Toaster />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <DialogProvider>{children}</DialogProvider>
          </QueryClientProvider>
        </ContentContainer>
      </SidebarProvider>
    </TooltipProvider>
  );
}
