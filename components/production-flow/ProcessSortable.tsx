import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProcessWithDepartament } from "@/types/database.type";
import ProcessSelector from "../custom/ProcessSelector";

type ProcessSortableProps = {
  selectedProcesses?: ProcessWithDepartament[];
  defaultProcesses?: ProcessWithDepartament[];
  onSelect: (processes: ProcessWithDepartament[]) => void;
};

export default function ProcessSortable({
  selectedProcesses,
  defaultProcesses,
  onSelect,
}: ProcessSortableProps) {
  return (
    <div className="flex flex-col gap-4">
      <ProcessSelector
        onSelect={onSelect}
        selectedProcesses={selectedProcesses}
        defaultProcesses={defaultProcesses}
        formatter={(process) => process.name}
      />

      <Sortable
        value={selectedProcesses || []}
        onValueChange={onSelect}
        getItemValue={(item) => item.id}
      >
        <Table className="rounded-none border">
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="w-[50px] bg-transparent" />
              <TableHead className="bg-transparent">Processo</TableHead>
              <TableHead className="bg-transparent">Departamento</TableHead>
            </TableRow>
          </TableHeader>
          <SortableContent asChild>
            <TableBody>
              {selectedProcesses?.map((process) => (
                <SortableItem key={process.id} value={process.id} asChild>
                  <TableRow>
                    <TableCell className="w-[50px]">
                      <SortableItemHandle asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <GripVertical className="h-4 w-4" />
                        </Button>
                      </SortableItemHandle>
                    </TableCell>

                    <TableCell className="font-medium">{process.name}</TableCell>

                    <TableCell className="text-muted-foreground">
                      {process.departament.name}
                    </TableCell>
                  </TableRow>
                </SortableItem>
              ))}
            </TableBody>
          </SortableContent>
        </Table>
        <SortableOverlay>
          <div className="size-full rounded-none bg-primary/10" />
        </SortableOverlay>
      </Sortable>
      {selectedProcesses?.length == 0 && (
        <div className="self-center">Nenhum processo adicionado.</div>
      )}
    </div>
  );
}
