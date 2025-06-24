import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { BaseProduct } from "@/@types/admin/base-product";
import { CreateBaseProductRequest } from "@/@schemas/base-product";

type UpdateBaseProductResponse =
	| HTTPSuccessResponse<BaseProduct>
	| HTTPErrorResponse;

/**
 * @description Atualiza um produto base
 * @param id ID do produto base
 * @param request Dados para atualização
 * @returns
 */
export async function updateBaseProduct(
	id: string,
	request: CreateBaseProductRequest
): Promise<UpdateBaseProductResponse> {
	try {
		const response = await api.put<HTTPSuccessResponse<BaseProduct>>(
			`/base-products/${id}`,
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
