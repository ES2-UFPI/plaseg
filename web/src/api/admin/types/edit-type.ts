import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { CreateTypeRequest } from "@/@schemas/type";

type EditTypeResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * @description Adiciona um tipo
 * @param request
 * @returns
 */
export async function editType(
	id: string,
	request: CreateTypeRequest
): Promise<EditTypeResponse> {
	try {
		const response = await api.put<HTTPSuccessResponse<null>>(
			`/types/${id}`,
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
