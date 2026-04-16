import AddButton from "@/components/custom/buttons/AddButton";
import Link from "next/link";

export default function useCreateProductionFlowDialog() {
  return (
    <Link className="self-end" href="/production-flows/create">
      <AddButton label="Criar Novo fluxo" />
    </Link>
  );
}
