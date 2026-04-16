import { Database } from "@/database.types";

export type Departament = Database["public"]["Tables"]["Departament"]["Row"];

export type Product = Database["public"]["Tables"]["Product"]["Row"];
export type ProductWithProductionFlow = Omit<Product, "production_flow_id"> & {
  production_flow: ProductionFlow;
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
  process: Process;
  from_process: Process;
  responsible: Responsible;
};

export type ProcessExecutionType = ProcessExecution["type"];
export type ProcessExecutionStatus = ProcessExecution["status"];

export type ProcessState = {
  process: ProcessWithDepartament;
  avaliableAmount: number;
  status: ProcessExecutionStatus;
  flowTemplates: ProductionFlowTemplateWithProcess[];
  movimentation: MovimentationPopulated;
  previousProcess: ProcessWithDepartament | null;
  nextProcess: ProcessWithDepartament | null;
};

export type ProductMovimentation = {
  product: Product;
  movimentations: MovimentationPopulated[];
};
