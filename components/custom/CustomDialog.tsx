import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type CustomDialogProps = {
    title?: React.ReactNode
    description?: React.ReactNode
    trigger: React.ReactNode
    children: React.ReactNode

}


export default function CustomDialog({ title, description, trigger, children }: CustomDialogProps) {
    return (

        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
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