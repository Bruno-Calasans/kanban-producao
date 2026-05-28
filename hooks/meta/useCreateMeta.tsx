import { createMeta, CreateMetaData } from "@/service/api/metaApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";

export default function usecreateMeta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMetaData) => createMeta(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: metaKeys.list(data.deadline_id),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
