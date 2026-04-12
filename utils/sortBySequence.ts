
type ItemWithSequence = {
    sequence: number
}

export function sortBySequence(itemA: ItemWithSequence, itemB: ItemWithSequence) {
    if (itemA.sequence > itemB.sequence) return 1
    else return -1
}