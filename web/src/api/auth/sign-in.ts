import type { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface SignInRequestBody {
	email: string;
	password: string;
}

interface SignInSuccessResponse extends HTTPSuccessResponse < {
		accessToken: string;
	}> {}

type SignInResponse = SignInSuccessResponse | HTTPErrorResponse;

export async function signIn(
	data: SignInRequestBody
): Promise<SignInResponse> {
	try {
		const response = await api.post<SignInSuccessResponse>(
			"/auth/sign-in",
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