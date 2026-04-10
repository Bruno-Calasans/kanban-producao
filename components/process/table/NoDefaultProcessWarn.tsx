import Link from "next/link";


export default function NoDefaultProcessWarn() {
    return (
        <div className="bg-red-400 mb-4 text-sm">
            <p className="text-stone-100 italic">
                Nenhum <span className="font-bold">processo padrão</span> encontrado.
                Marque o processo como padrão ou mude nas {" "}
                <Link href="/configuracoes">
                    <span className="font-bold text-indigo-500 hover:underline">
                        configurações.
                    </span>
                </Link>

            </p>
        </div>
    )

}