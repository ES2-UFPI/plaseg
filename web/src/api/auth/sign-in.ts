import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

interface SignInRequest {
	email: string;
	password: string;
}

interface SignInResponseData {
	accessToken: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
	};
}

type SignInResponse =
	| HTTPSuccessResponse<SignInResponseData>
	| HTTPErrorResponse;

export async function signIn(
	credentials: SignInRequest
): Promise<SignInResponse> {
	try {
		const response = await api.post<SignInResponse>(
			"/auth/sign-in",
			credentials
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
