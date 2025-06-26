import { HTTPErrorResponse, HTTPSuccessResponse } from "@/@types/http/http";
import { api } from "@/services/axios";
import { AxiosError } from "axios";

type SignUpRequest = {
	name: string;
	document: string;
	email: string;
	password: string;
	phone: string;
	role: "COMPANY" | "CONSULTANT" | "MUNICIPALITY";
};

type SignUpResponse = HTTPSuccessResponse<null> | HTTPErrorResponse;

export async function signUp(request: SignUpRequest): Promise<SignUpResponse> {
	try {
		const response = await api.post<HTTPSuccessResponse<null>>(
			"/auth/sign-up",
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
