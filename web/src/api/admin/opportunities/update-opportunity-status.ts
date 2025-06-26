import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { Opportunity } from "@/@types/common/opportunity";

type UpdateOpportunityStatusResponse =
	| HTTPSuccessResponse<Opportunity>
	| HTTPErrorResponse;

export async function updateOpportunityStatus(
	opportunityId: string,
	status: boolean
): Promise<UpdateOpportunityStatusResponse> {
	try {
		const response = await api.patch<HTTPSuccessResponse<Opportunity>>(
			`/admin/opportunities/${opportunityId}/status/${status}`
		);

		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.data) {
			return error.response.data;
		}
		return {
			success: false,
			errors: ["Erro desconhecido"],
			data: null,
		};
	}
}
