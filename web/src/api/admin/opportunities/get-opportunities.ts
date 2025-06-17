import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { OpportunitySchema } from "@/@schemas/opportunity";

type GetOpportunitiesResponse =
	| HTTPSuccessResponse<OpportunitySchema[]>
	| HTTPErrorResponse;

export async function getOpportunities(): Promise<GetOpportunitiesResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<OpportunitySchema[]>>(
			"/opportunities"
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
