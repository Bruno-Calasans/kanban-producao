import { Database } from "@/database.types"

export type Departament = Database['public']['Tables']['Departament']['Row']
export type ProductLog = Database['public']['Tables']['ProductLog']['Row']

export type Product = Database['public']['Tables']['Product']['Row']
export type ProductPopulated = Omit<
    Product, "departament_id" |
    "process_id" |
    "responsible_id"
> & {
    departament: Departament | null,
    process: Process | null,
    responsible: Responsible | null
}


export type Process = Database['public']['Tables']['Process']['Row']
export type ProcessWithDepartament = Omit<Process, 'departament_id'> & {
    departament: Departament
}

export type Responsible = Database['public']['Tables']['Responsible']['Row']
export type ResponsibleWithDepartament = Omit<Responsible, 'departament_id'> & {
    departament: Departament
}

export type Movimentation = Database['public']['Tables']['Movimentation']['Row']
export type MovimentationPopulated =
    Omit<Movimentation,
        "departament_destination_id" |
        "departament_origin_id" |
        "process_destination_id" |
        "process_origin_id" |
        "product_id"
    > & {
        departamentOrigin: Departament,
        departamentDestination: Departament,
        processOrigin: Process,
        processDestination: Process
        product: Product
    }

