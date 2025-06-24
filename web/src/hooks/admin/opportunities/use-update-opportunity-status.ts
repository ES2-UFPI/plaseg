import { updateOpportunityStatus } from "@/api/admin/opportunities/update-opportunity-status";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query";
import { toast } from "sonner";

export function useUpdateOpportunityStatus() {
	const {
		mutate: updateOpportunityStatusFn,
		isPending: isLoadingUpdateOpportunityStatus,
	} = useMutation({
		mutationKey: ["update-opportunity-status"],
		mutationFn: ({
			opportunityId,
			status,
		}: {
			opportunityId: string;
			status: boolean;
		}) => updateOpportunityStatus(opportunityId, status),
		onSuccess: (response) => {
			if (response.success) {
				queryClient.invalidateQueries({
					queryKey: ["opportunities"],
				});
				toast.success("Status da oportunidade atualizado com sucesso!");
				return;
			}

			response.errors.forEach((error) => {
				toast.error(error);
			});
		},
	});

	return {
		updateOpportunityStatusFn,
		isLoadingUpdateOpportunityStatus,
	};
}
