import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";

interface AllocationDepartment {
	id: string;
	description: string;
	address: string;
	createdAt: string;
	updatedAt: string;
}

type GetAllocationDepartmentsResponse =
	| HTTPSuccessResponse<AllocationDepartment[]>
	| HTTPErrorResponse;

/**
 * @description Busca todos os departamentos de alocação
 * @returns Resposta da API
 */
export async function getAllocationDepartments(): Promise<GetAllocationDepartmentsResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<AllocationDepartment[]>>(
			"/municipality/allocation-departments"
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
