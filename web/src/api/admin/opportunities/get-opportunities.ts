import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { Opportunity } from "@/@schemas/opportunity";

type GetOpportunitiesResponse =
	| HTTPSuccessResponse<Opportunity[]>
	| HTTPErrorResponse;

export async function getOpportunities(): Promise<GetOpportunitiesResponse> {
	try {
		const response =
			await api.get<HTTPSuccessResponse<Opportunity[]>>("/opportunities");

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
