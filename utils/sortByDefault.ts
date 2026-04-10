import { Departament } from "@/types/database.type"


type ItemWithDefault = {
    is_default: boolean
}

export default function sortByDefault(itemA: ItemWithDefault, itemB: ItemWithDefault) {
    const defaultA = itemA.is_default
    const defaultB = itemB.is_default
    return Number(defaultA) - Number(defaultB)
}
