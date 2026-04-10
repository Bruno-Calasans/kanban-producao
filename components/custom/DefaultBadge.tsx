import { Badge } from "@/components/ui/badge"

type DefaultBadgeProps = {
    isDefault?: boolean
}

export default function DefaultBadge({ isDefault }: DefaultBadgeProps) {
    return isDefault ?
        <Badge variant="default" className="bg-emerald-500 rounded-full">Sim</Badge> :
        <Badge variant="secondary" className="rounded-full">Não</Badge>
}