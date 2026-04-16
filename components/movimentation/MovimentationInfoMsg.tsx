import { MovimentationPopulated } from "@/types/database.type";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import MovimentationStatusBadge from "../custom/badges/MovimentationStatusBadge";

type MovimentationInfoMsgProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationInfoMsg({ movimentation }: MovimentationInfoMsgProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <p>
        <strong>ID:</strong> #{movimentation.id}
      </p>
      <p className="flex gap-1">
        <strong>Produto:</strong>{" "}
        <Link
          className="flex gap-1 justify-center items-center hover:underline"
          href={`/products/${movimentation.product.id}`}
        >
          {movimentation.product.name}
          <InfoIcon className="text-indigo-500" size={18} />
        </Link>
      </p>
      <p>
        <strong>Quantidade:</strong> {movimentation.amount}
      </p>
      <p className="flex gap-1 items-start text-center">
        <strong>Status:</strong> <MovimentationStatusBadge movimentation={movimentation} />
      </p>
    </div>
  );
}
