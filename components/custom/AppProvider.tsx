"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ContentContainer from "./ContentContainer"
import { Toaster } from "sonner"
import { AppSidebar } from "./AppSideBar"
import { DialogProvider } from "@/hooks/dialog/DialogContext"

const queryClient = new QueryClient()


export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarTrigger />
            <ContentContainer>
                <Toaster />
                <QueryClientProvider client={queryClient}>
                    <DialogProvider>
                        {children}
                    </DialogProvider>
                </QueryClientProvider>
            </ContentContainer>
        </SidebarProvider>
    )
}