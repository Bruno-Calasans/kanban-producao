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
export type MovimentationPopulated = Omit<
  Movimentation,
  | "product_id"
> & {
  product: Product;
};

export type ProductionFlow = Database["public"]["Tables"]["ProductionFlow"]["Row"];
export type ProductionFlowTemplate = Database["public"]["Tables"]["ProductionFlowTemplate"]["Row"];
