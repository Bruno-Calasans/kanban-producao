import { Departament } from "@/types/database.type";
import { FactoryIcon, CogIcon } from "lucide-react";

type MovimentationStateMsgProps = {
  fromDepartament: Departament | null;
  toDepartament: Departament | null;
};

export default function MovimentationStateMsg({
  fromDepartament,
  toDepartament,
}: MovimentationStateMsgProps) {
  return (
    <div className="flex flex-col  gap-4 mb-5">
      <div className="flex justify-between gap-4">
        {/* Departamento origem */}
        <div className="flex gap-1 flex-1">
          <FactoryIcon size={18} />
          <p className="flex flex-col flex-1">
            <strong>Departamento Origem</strong>
            {fromDepartament?.name}
          </p>
        </div>

        {/* Departamento destino */}
        <div className="flex gap-1 flex-1">
          <FactoryIcon size={18} />
          <p className="flex flex-col">
            <strong>Departamento Destino</strong> {toDepartament?.name}
          </p>
        </div>
      </div>
    </div>
  );
}
