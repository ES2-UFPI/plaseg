import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { Opportunity } from "@/@types/common/opportunity";
import { OpportunityRequest } from "@/@schemas/opportunity";

type CreateOpportunityResponse =
	| HTTPSuccessResponse<Opportunity>
	| HTTPErrorResponse;

/**
 * @description Adiciona uma oportunidade
 * @param request
 * @returns
 */
export async function createOpportunity(
	request: OpportunityRequest
): Promise<CreateOpportunityResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<Opportunity>>(
			"/opportunities",
			request
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
