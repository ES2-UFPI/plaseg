import { CreateMunicipalityRequest } from "@/@schemas/municipality-schema";
import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type CreateMunicipalityResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * Cria uma nova cidade
 * @param request - Dados da cidade
 * @returns Resposta da API
 */
export async function createMunicipality(
	request: CreateMunicipalityRequest
): Promise<CreateMunicipalityResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/municipality",
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
