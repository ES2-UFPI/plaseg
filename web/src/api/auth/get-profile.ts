import { GetProfileResponseBody } from "@/@schemas/auth";
import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type GetProfileResponse =
	| HTTPSuccessResponse<GetProfileResponseBody>
	| HTTPErrorResponse;

export async function getProfile(): Promise<GetProfileResponse> {
	try {
		const response = await api.get<GetProfileResponse>("/auth/profile");

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
