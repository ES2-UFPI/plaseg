import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { CreateRequiredDocumentRequest } from "@/@schemas/required-document";

type CreateRequiredDocumentResponse =
	| HTTPSuccessResponse<null>
	| HTTPErrorResponse;

/**
 * @description Adiciona um documento obrigatório
 * @param request - Dados do documento obrigatório
 * @returns Resposta da API
 */
export async function createRequiredDocument(
	request: CreateRequiredDocumentRequest //
): Promise<CreateRequiredDocumentResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/required-documents",
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
