import { Database } from "@/database.types";

// Departamento
export type Departament = Database["public"]["Tables"]["Departament"]["Row"];

// Produto
export type Product = Database["public"]["Tables"]["Product"]["Row"];

// Responsável
export type Responsible = Database["public"]["Tables"]["Responsible"]["Row"];
export type ResponsibleWithDepartament = Omit<Responsible, "departament_id"> & {
  departament: Departament;
};

// Produção
export type Production = Database["public"]["Tables"]["Production"]["Row"];
export type ProductionPopulated = Production & {
  product: Product;
  productionFlow: ProductionFlow;
};

// Fluxo de produção
export type ProductionFlow = Database["public"]["Tables"]["ProductionFlow"]["Row"];
export type ProductionFlowTemplate = Database["public"]["Tables"]["ProductionFlowTemplate"]["Row"];
export type ProductionFlowTemplatePopulated = Omit<ProductionFlowTemplate, "departament_id"> & {
  departament: Departament;
};

// Movimentação
export type Movimentation = Database["public"]["Tables"]["Movimentation"]["Row"];
export type MovimentationPopulated = Movimentation & {
  product: Product;
  production: Production;
  departament: Departament | null;
  from_departament: Departament | null;
  responsible: Responsible | null;
};

export type MovimentationType = Movimentation["type"];
export type MovimentationStatus =
  | "PENDING"
  | "SUCCESS"
  | "IN_PROGRESS"
  | "ERROR"
  | "SKIPPED"
  | "REPROCESSING"
  | "EXTERNAL";

export type DepartamentStateFlags = {
  hasReprocess?: boolean;
  hasPendingReprocess?: boolean;
  partiallyReprocessed?: boolean;
  hasExternal?: boolean;
  hasPendingExternal?: boolean;
  partiallyexternal?: boolean;
  partiallyExternal?: boolean;
};

export type DepartamentState = {
  inputAmount: number;
  outputAmount: number;
  externalAmount: number;
  reprocessAmount: number;
  avaliableAmount: number;
  forwardAmount: number;
  status: MovimentationStatus;
  flowTemplates: ProductionFlowTemplatePopulated[];
  production: ProductionPopulated;
  departament: Departament;
  previousDepartament: Departament | null;
  nextDepartament: Departament | null;
  template: ProductionFlowTemplatePopulated;
  movimentations: MovimentationPopulated[];
  inputMovimentations: MovimentationPopulated[];
  outputMovimentations: MovimentationPopulated[];
  flags?: DepartamentStateFlags;
};

export type ProductMovimentation = {
  product: Product;
  movimentations: MovimentationPopulated[];
};

export type ProductionDeadline = Database["public"]["Tables"]["ProductionDeadline"]["Row"];

export type ProductionDeadlinePopulated = Omit<
  ProductionDeadline,
  "departament_id" | "movimention_id"
> & {
  departament: Departament;
  movimentation: MovimentationPopulated;
};

// Objetivo diário
export type DailyGoal = Database["public"]["Tables"]["DailyGoal"]["Row"];
export type DailyGoalPopulated = Omit<DailyGoal, "deadline_id"> & {
  deadline: ProductionDeadline;
};

export type ProductionStatus = Database["public"]["Tables"]["Production"]["Row"]["status"];
