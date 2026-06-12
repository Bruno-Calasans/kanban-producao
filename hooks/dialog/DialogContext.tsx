"use client";

import { createContext, useState } from "react";

export type DialogID =
  // Produto
  | "create-product"
  | `edit-product-${number}`
  | `update-product-${number}`
  | `delete-product-${number}`

  // Departamento
  | "create-departament"
  | "edit-departament"
  | "delete-departament"

  // Processo
  | "create-process"
  | "edit-process"
  | "delete-process"

  // Responsável
  | "create-responsible"
  | "edit-responsible"
  | "delete-responsible"

  // Produção
  | "create-production"
  | `edit-production-${number}`
  | `update-production-${number}`
  | `cancel-production-${number}`
  | `delete-production-${number}`

  // Fluxo de Produção
  | "create-production-flow"
  | "edit-production-flow"
  | "delete-production-flow"

  // excluir
  | "create-process-execution"
  | "edit-process-execution"
  | "delete-process-execution"
  | `create-process-execution-${number}`

  // Prazos
  | `create-deadline`
  | `edit-deadline-${number}`
  | `finish-deadline-${number}`
  | `finish-meta-${number | string}`

  // Movimentação
  | `create-movimentation-${number}`
  | `delete-movimentation-${number}`
  | `external-movimentation-${number}`
  | `return-movimentation-${number}`
  | `skip-movimentation-${number}`
  | `reprocess-movimentation-${number}`;

export type DialogContext = {
  dialog: DialogID | null;
  closeDialog: (id: DialogID) => void;
  openDialog: (id: DialogID) => void;
};

export const DialogContext = createContext<DialogContext>({
  dialog: null,
  closeDialog(id: DialogID) {},
  openDialog(id: DialogID) {},
});

type DialogProviderProps = {
  children: React.ReactNode;
};

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogID | null>(null);

  const openDialog = (id: DialogID) => setDialog(id);
  const closeDialog = () => setDialog(null);

  return (
    <DialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}
