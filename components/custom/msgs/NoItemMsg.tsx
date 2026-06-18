import { Button } from "@/components/ui/button";
import Link from "next/link";

type NoItemFoundMsgProps = {
  title: string;
  desc: string;
  url: string;
  urlName: string;
};

export default function NoItemFoundMsg({ title, desc, url, urlName }: NoItemFoundMsgProps) {
  return (
    <div className="text-sm italic">
      <p className="italic font-semibold">{title}</p>
      <p>
        {desc}{" "}
        <Link href={url}>
          <Button className="cursor-pointer self-start p-0 underline" variant="link">
            {urlName}
          </Button>
        </Link>
        .
      </p>
    </div>
  );
}
