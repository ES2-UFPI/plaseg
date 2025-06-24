import { AddRequestedItemRequest } from "@/@schemas/project";
import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type AddRequestedItemResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * Adiciona um novo item solicitado ao projeto
 * @param projectId - ID do projeto
 * @param request - Dados do item solicitado
 * @returns Resposta da API
 */
export async function addRequestedItem(
	projectId: string,
	request: AddRequestedItemRequest
): Promise<AddRequestedItemResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			`/projects/${projectId}/requested-item`,
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
