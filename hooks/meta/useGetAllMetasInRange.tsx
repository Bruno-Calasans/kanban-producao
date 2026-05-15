import { useQuery } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";
import { getAllMetasInRange } from "@/service/api/metaApi";

export default function useGetAllMetasInRange(fromDate: Date, toDate: Date) {
  return useQuery({
    queryKey: metaKeys.lists(),
    queryFn: () => getAllMetasInRange(fromDate, toDate),
    enabled: !!fromDate && !!toDate,
  });
}
