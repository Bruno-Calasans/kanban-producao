
type ItemWithOrder = {
    order: number
}

export function sortByOrder(itemA: ItemWithOrder, itemB: ItemWithOrder) {
    if (itemA.order > itemB.order) return 1
    else return -1
}