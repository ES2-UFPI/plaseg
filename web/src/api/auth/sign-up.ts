import type { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface SignUpRequestBody {
	name: string;
	email: string;
	password: string;
}

type SignUpResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

export async function signUp(body: SignUpRequestBody): Promise<SignUpResponse> {
	try {
		const response = await api.post<SignUpResponse>("/auth/sign-up", body);

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
