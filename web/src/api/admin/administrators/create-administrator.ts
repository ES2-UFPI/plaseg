import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { CreateAdministratorRequest } from "@/@schemas/administrator";

type CreateAdministratorResponse =
	| HTTPSuccessResponse<null>
	| HTTPErrorResponse;

export async function createAdministrator(
	data: CreateAdministratorRequest
): Promise<CreateAdministratorResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/admin/create",
			data
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
