import PageTitle from "@/components/custom/PageTitle";
import { Button } from "@/components/ui/button";
import { CircleArrowLeftIcon } from "lucide-react";

export default function PageNotFound() {
    return (
        <section>
            <PageTitle>Erro 404 - Página Não Encontrada</PageTitle>
            <p>
                A página que você está procurando não existe. Verifique a URL ou volte para a página inicial.
            </p>
            <Button className="mt-2" size="lg">
                <CircleArrowLeftIcon className="w-4 h-4 mr-2" />
                <a href="/">Voltar para a Página Inicial</a>
            </Button>
        </section>
    )
}