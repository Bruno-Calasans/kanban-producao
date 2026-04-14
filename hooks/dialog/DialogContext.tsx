"use client"

import { createContext, useState } from "react"


export type DialogID =
    "create-product" |
    "edit-product" |
    "delete-product" |
    "create-departament" |
    "edit-departament" |
    "delete-departament" |
    "create-process" |
    "edit-process" |
    "delete-process" |
    "create-responsible" |
    "edit-responsible" |
    "delete-responsible" |
    "create-movimentation" |
    "edit-movimentation" |
    "delete-movimentation" |
    "cancel-movimentation" |
    "create-product-log" |
    "edit-product-log" |
    "delete-product-log" |
    "create-production-flow" |
    "edit-production-flow" |
    "delete-production-flow"


export type DialogContext = {
    dialog: DialogID | null
    closeDialog: (id: DialogID) => void,
    openDialog: (id: DialogID) => void
}


export const DialogContext = createContext<DialogContext>({
    dialog: null,
    closeDialog(id: DialogID) { },
    openDialog(id: DialogID) { },
})

type DialogProviderProps = {
    children: React.ReactNode
}

export function DialogProvider({ children }: DialogProviderProps) {
    const [dialog, setDialog] = useState<DialogID | null>(null)

    const openDialog = (id: DialogID) => setDialog(id)
    const closeDialog = () => setDialog(null)

    return (
        <DialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    )
}