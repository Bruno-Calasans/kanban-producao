import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogID } from "@/hooks/dialog/DialogContext"
import useDialog from "@/hooks/dialog/useDialog"
import { cn } from "@/lib/utils"

type CustomDialogProps = {
    id: DialogID
    title?: React.ReactNode
    description?: React.ReactNode
    trigger: React.ReactNode
    children: React.ReactNode
    maxContentWidth?: number
    triggerClassName?: string
}


export default function CustomDialog({ id, title, description, trigger, maxContentWidth, triggerClassName, children }: CustomDialogProps) {
    const { dialog, openDialog, closeDialog } = useDialog()

    const openHandler = (value: boolean) => {
        if (value) openDialog(id)
        else closeDialog(id)
    }

    return (
        <Dialog open={dialog === id} onOpenChange={openHandler}>
            <DialogTrigger className={cn(triggerClassName)} asChild>{trigger}</DialogTrigger>
            <DialogContent style={{
                maxWidth: maxContentWidth
            }}>
                <DialogHeader>
                    <DialogTitle className="font-bold text-lg">{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}