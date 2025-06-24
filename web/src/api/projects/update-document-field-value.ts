import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type UpdateDocumentFieldValueResponse =
	| HTTPSuccessResponse<null>
	| HTTPErrorResponse;

interface UpdateDocumentFieldValueRequest {
	value: string;
}

/**
 * Atualiza o valor de um campo de documento do projeto
 * @param fieldId - ID do campo do documento
 * @param request - Dados com o novo valor do campo
 * @returns Resposta da API
 */
export async function updateDocumentFieldValue(
	fieldId: string,
	request: UpdateDocumentFieldValueRequest
): Promise<UpdateDocumentFieldValueResponse> {
	try {
		const response = await api.patch<HTTPSuccessResponse<null>>(
			`/projects/document-fields/${fieldId}`,
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
