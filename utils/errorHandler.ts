"use client"

import { PostgrestError } from "@supabase/supabase-js"
import { toast } from "sonner"


type ErrorMsg = {
    unknown: string
    duplicate: string
    notFound?: string
    nullValue?: string
    invalidRelation?: string
    invalidField?: string
    default?: string
}

export const defaultErrorMsgs: ErrorMsg = {
    unknown: "Ocorreu um erro desconhecido.",
    duplicate: "Erro: item duplicado.",
    notFound: "Erro: item não encontrado!",
    nullValue: "Erro: campo obrigatório não preenchido.",
    invalidRelation: "Erro: relação inválida.",
    invalidField: "Erro: campo inválido.",
    default: "Erro: não foi possível realizar sua solicitação"
}

export default function errorHandler(error: unknown, msgs: Partial<ErrorMsg> = {}) {


    if (error instanceof PostgrestError) {

        if (error.code == "23505") {
            toast.error(msgs.duplicate || defaultErrorMsgs.duplicate)
        }
        else if (error.code == "23502") {
            toast.error(msgs.nullValue || defaultErrorMsgs.nullValue)
        }
        else if (error.code == "23503") {
            toast.error(msgs.invalidRelation || defaultErrorMsgs.invalidRelation)
        }
        else if (error.code == "PGRST204") {
            toast.error(msgs.invalidField || defaultErrorMsgs.invalidField)
        }
        else if (error.code == "20000") {
            toast.error(msgs.notFound || defaultErrorMsgs.notFound)

        } else {
            toast.error(msgs.default || defaultErrorMsgs.default)
        }

    }
    else {
        toast.error(`Error: ${error?.message}` || defaultErrorMsgs.unknown)
    }
}