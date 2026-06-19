import { XIcon } from "lucide-react";

type RemoveDateButtonProps = {
  title: string;
  onClick: () => void;
};

export default function RemoveDateButton({ title, onClick }: RemoveDateButtonProps) {
  return (
    <div
      title={title}
      className="cursor-default bg-red-500 rounded-full hover:bg-red-600"
      onClick={() => onClick}
    >
      <XIcon className="text-white h-4 w-4" />
    </div>
  );
}
