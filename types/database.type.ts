import { Database } from "@/database.types";

export type Departament = Database["public"]["Tables"]["Departament"]["Row"];

export type Product = Database["public"]["Tables"]["Product"]["Row"];
export type ProductWithProductionFlow = Omit<Product, "production_flow_id"> & {
  production_flow: ProductionFlow;
  production_flow_id: number;
};

export type Process = Database["public"]["Tables"]["Process"]["Row"];
export type ProcessWithDepartament = Omit<Process, "departament_id"> & {
  departament: Departament;
};

export type Responsible = Database["public"]["Tables"]["Responsible"]["Row"];
export type ResponsibleWithDepartament = Omit<Responsible, "departament_id"> & {
  departament: Departament;
};

export type Movimentation = Database["public"]["Tables"]["Movimentation"]["Row"];
export type MovimentationPopulated = Omit<Movimentation, "product_id"> & {
  product: Product;
};

export type ProductionFlow = Database["public"]["Tables"]["ProductionFlow"]["Row"];
export type ProductionFlowTemplate = Database["public"]["Tables"]["ProductionFlowTemplate"]["Row"];
export type ProductionFlowTemplateWithProcess = Omit<ProductionFlowTemplate, "process_id"> & {
  process: ProcessWithDepartament;
};

export type ProcessExecution = Database["public"]["Tables"]["ProcessExecution"]["Row"];
export type ProcessExecutionPopulated = Omit<
  ProcessExecution,
  "movimentation_id" | "product_id" | "process_id" | "from_process_id" | "responsible_id"
> & {
  movimentation: Movimentation;
  product: Product;
  process: Process | null;
  from_process: Process | null;
  responsible: Responsible | null;
};

export type ProcessExecutionType = ProcessExecution["type"];
export type ProcessExecutionStatus =
  | "PENDING"
  | "SUCCESS"
  | "IN_PROGRESS"
  | "ERROR"
  | "SKIPPED"
  | "REPROCESSING"
  | "EXTERNAL";

export type ProcessStateFlags = {
  hasReprocess?: boolean;
  hasPendingReprocess?: boolean;
  partiallyReprocessed?: boolean;
  hasExternal?: boolean;
  hasPendingExternal?: boolean;
  partiallyexternal?: boolean;
  partiallyExternal?: boolean;
};

export type ProcessState = {
  process: ProcessWithDepartament;
  inputAmount: number;
  outputAmount: number;
  externalAmount: number;
  reprocessAmount: number;
  avaliableAmount: number;
  forwardAmount: number;
  status: ProcessExecutionStatus;
  flowTemplates: ProductionFlowTemplateWithProcess[];
  movimentation: MovimentationPopulated;
  previousProcess: ProcessWithDepartament | null;
  nextProcess: ProcessWithDepartament | null;
  template: ProductionFlowTemplateWithProcess;
  executions: ProcessExecutionPopulated[];
  inputExecutions: ProcessExecutionPopulated[];
  outputExecutions: ProcessExecutionPopulated[];
  flags?: ProcessStateFlags;
};

export type ProductMovimentation = {
  product: Product;
  movimentations: MovimentationPopulated[];
};

export type MovimentationDeadline = Database["public"]["Tables"]["MovimentationDeadline"]["Row"];

export type MovimentationDeadlinePopulated = Omit<
  MovimentationDeadline,
  "departament_id" | "movimention_id"
> & {
  departament: Departament;
  movimentation: MovimentationPopulated;
};

export type Meta = Database["public"]["Tables"]["Meta"]["Row"];
export type MetaPopulated = Omit<Meta, "deadline_id"> & {
  deadline: MovimentationDeadline;
};

export type MovimentationStatus = Database["public"]["Tables"]["Movimentation"]["Row"]["status"];
