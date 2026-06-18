import { ProductionPopulated, ProductProduction } from "@/types/database.type";

export default function groupProductProductions(productions: ProductionPopulated[]) {
  const groups: ProductProduction[] = [];

  productions.forEach((mov) => {
    const groupIndex = groups.findIndex((group) => group.product.id == mov.product.id);

    if (groupIndex != -1) {
      groups[groupIndex].productions.push(mov);
    } else {
      groups.push({
        product: mov.product,
        productions: [mov],
      });
    }
  });

  return groups;
}
