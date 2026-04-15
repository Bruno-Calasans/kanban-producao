import { ProcessWithDepartament } from "@/types/database.type";
import { FactoryIcon, CogIcon } from "lucide-react";

type ExecutionStateMsgProps = {
  from_process: ProcessWithDepartament;
  to_process: ProcessWithDepartament;
};

export default function ExecutionStateMsg({ from_process, to_process }: ExecutionStateMsgProps) {
  return (
    <div className="flex flex-col  gap-4 mb-4">
      <div className="flex justify-between gap-4">
        {/* Departamento origem */}
        <div className="flex gap-1 flex-1">
          <FactoryIcon size={18} />
          <p className="flex flex-col flex-1">
            <strong>Departamento Origem</strong>
            {from_process.departament.name}
          </p>
        </div>

        {/* Processo origem */}
        <div className="flex gap-1 flex-1">
          <CogIcon size={18} />
          <p className="flex flex-col">
            <strong>Processo Origem</strong>
            {from_process.name}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        {/* Departamento destino */}
        <div className="flex gap-1 flex-1">
          <FactoryIcon size={18} />
          <p className="flex flex-col">
            <strong>Departamento Destino</strong> {to_process.departament.name}
          </p>
        </div>

        {/* Processo destino */}
        <div className="flex gap-1 flex-1">
          <CogIcon size={18} />
          <p className="flex flex-col">
            <strong>Processo Destino</strong> {to_process.name}
          </p>
        </div>
      </div>
    </div>
  );
}
