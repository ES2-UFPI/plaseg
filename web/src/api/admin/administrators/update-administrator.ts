import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";
import { UpdateAdministratorRequest } from "@/@schemas/administrator";
import { User } from "@/@types/auth/user";

type UpdateAdministratorResponse =
	| HTTPSuccessResponse<User>
	| HTTPErrorResponse;

export async function updateAdministrator(
	id: string,
	data: UpdateAdministratorRequest
): Promise<UpdateAdministratorResponse> {
	try {
		const response = await api.put<HTTPSuccessResponse<User>>(
			`/administrators/${id}`,
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
