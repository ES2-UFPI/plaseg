import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { BaseProduct } from "@/@types/admin/base-product";

type GetBaseProductsResponse =
	| HTTPSuccessResponse<{
			baseProducts: BaseProduct[];
	  }>
	| HTTPErrorResponse;

/**
 * @description Busca todos os produtos base
 * @returns
 */
export async function getBaseProducts(): Promise<GetBaseProductsResponse> {
	try {
		const response =
			await api.get<HTTPSuccessResponse<{ baseProducts: BaseProduct[] }>>(
				"/base-products"
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
