type ItemWithDefault = {
  is_active: boolean;
};

export default function sortByIsActive(itemA: ItemWithDefault, itemB: ItemWithDefault) {
  const defaultA = itemA.is_active;
  const defaultB = itemB.is_active;
  return Number(defaultA) - Number(defaultB);
}
