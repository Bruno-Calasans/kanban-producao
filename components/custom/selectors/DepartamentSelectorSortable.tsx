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
import { Departament } from "@/types/database.type";
import MultiDepartamentSelector from "../MultiDepartamentSelector";

type DepartamentsSortableProps = {
  selectedDepartaments?: Departament[];
  defaultDepartaments?: Departament[];
  onSelect: (departaments: Departament[]) => void;
};

export default function DepartamentsSortable({
  selectedDepartaments,
  defaultDepartaments,
  onSelect,
}: DepartamentsSortableProps) {
  return (
    <div className="flex flex-col gap-4">
      <MultiDepartamentSelector
        onSelect={onSelect}
        selectedDepartaments={selectedDepartaments}
        defaultDepartaments={defaultDepartaments}
        formatter={(process) => process.name}
      />
      <Sortable
        value={selectedDepartaments || []}
        onValueChange={onSelect}
        getItemValue={(item) => item.id}
      >
        <Table className="rounded-none border">
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="w-12.5 bg-transparent" />
              <TableHead className="bg-transparent">Departamento</TableHead>
            </TableRow>
          </TableHeader>
          <SortableContent asChild>
            <TableBody>
              {selectedDepartaments?.map((departament) => (
                <SortableItem key={departament.id} value={departament.id} asChild>
                  <TableRow>
                    <TableCell className="w-12.5">
                      <SortableItemHandle asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <GripVertical className="h-4 w-4" />
                        </Button>
                      </SortableItemHandle>
                    </TableCell>

                    <TableCell className="font-medium">{departament.name}</TableCell>
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
      {/* Mensagem quando não tiver um departamento */}
      {selectedDepartaments?.length == 0 && (
        <div className="self-center">Nenhum departamento adicionado.</div>
      )}
    </div>
  );
}
