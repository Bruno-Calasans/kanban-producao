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

export type DepartamentStateStatus =
  | "PENDING" // Departamento ainda não começou a trabalhar
  | "COMPLETED" // Departamento terminou de trabalhar
  | "SKIPPED" // Departamento foi pulado
  | "EXTERNAL" // Departamento foi enviado para departamento para departamento externo
  | "IN_PROGRESS" // Departamento está trabalhando
  | "REPROCESSING"; // Departamento está retrabalhando algo que não deu certo

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
  returnAmount: number;
  avaliableAmount: number;
  forwardAmount: number;
  skippedAmount: number;
  status: DepartamentStateStatus;
  flowTemplates: ProductionFlowTemplatePopulated[];
  production: ProductionPopulated;
  departament: Departament;
  previousDepartament: Departament | null;
  nextDepartament: Departament | null;
  template: ProductionFlowTemplatePopulated | null;
  movimentations: MovimentationPopulated[];
  inputMovimentations: MovimentationPopulated[];
  outputMovimentations: MovimentationPopulated[];
  externalMovimentations: MovimentationPopulated[];
  returnMovimentations: MovimentationPopulated[];
  flags?: DepartamentStateFlags;
};

export type ProductProduction = {
  product: Product;
  productions: ProductionPopulated[];
};

export type ProductionDeadline = Database["public"]["Tables"]["ProductionDeadline"]["Row"];

export type ProductionDeadlinePopulated = ProductionDeadline & {
  departament: Departament;
  production: ProductionPopulated;
};

// Objetivo diário
export type DailyGoal = Database["public"]["Tables"]["DailyGoal"]["Row"];
export type DailyGoalPopulated = Omit<DailyGoal, "deadline_id"> & {
  deadline: ProductionDeadline;
};

export type ProductionStatus = Database["public"]["Tables"]["Production"]["Row"]["status"];

// histórico de prazos
export type ProductionDeadlineLog = Database["public"]["Tables"]["ProductionDeadlineLog"]["Row"];
export type ProductionDeadlineLogPopulated = ProductionDeadlineLog & {
  deadline: ProductionDeadline & { departament: Departament };
};
