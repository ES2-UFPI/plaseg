import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { CreateTypeRequest } from "@/@schemas/type";

type CreateTypeResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

/**
 * @description Adiciona um tipo
 * @param request
 * @returns
 */
export async function createType(
	request: CreateTypeRequest
): Promise<CreateTypeResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/types",
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
