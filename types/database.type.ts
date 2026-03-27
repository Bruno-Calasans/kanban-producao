import { Database } from "@/database.types"

export type Departament = Database['public']['Tables']['Departament']['Row']
export type ProductLog = Database['public']['Tables']['ProductLog']['Row']
export type Product = Database['public']['Tables']['Product']['Row']

export type Process = Database['public']['Tables']['Process']['Row']

export type ProcessWithDepartament = Omit<Process, 'departament_id'> & {
    departament: Departament
}


