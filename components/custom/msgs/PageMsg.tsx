import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import React from "react";

type PageMsgProps = {
  title?: React.ReactNode;
  content?: React.ReactNode;
  backBtnUrl?: string;
  backBtnLabel?: string;
};

export default function PageMsg({ title, content, backBtnUrl, backBtnLabel }: PageMsgProps) {
  return (
    <section className="flex flex-col gap-2">
      <div>
        <PageTitle>{title}</PageTitle>
        <div>{content}</div>
      </div>
      <div>
        <BackButton to={backBtnUrl || "/"} label={backBtnLabel || "Voltar à página principal"} />
      </div>
    </section>
  );
}
