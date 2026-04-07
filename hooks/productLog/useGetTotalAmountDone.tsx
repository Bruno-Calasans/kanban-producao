
import { useQuery } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"
import { getTotalAmountDone, TotalAmountDoneData } from "@/service/api/productLogApi"


export default function useGetTotalAmountDone(data: TotalAmountDoneData) {
    const { product_id, departament_id, process_id } = data
    return useQuery({
        queryKey: productlogKeys.list(product_id),
        queryFn: () => getTotalAmountDone(data),
        enabled: !!product_id && !!departament_id && !!process_id
    })

}