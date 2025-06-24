import { HTTPSuccessResponse, HTTPErrorResponse } from "@/@types/http/http";
import { AxiosError } from "axios";
import { api } from "@/services/axios";

interface MaintenanceContract {
	id: string;
	description: string;
	attachment: string;
	createdAt: string;
	updatedAt: string;
}

type GetMaintenanceContractsResponse =
	| HTTPSuccessResponse<MaintenanceContract[]>
	| HTTPErrorResponse;

/**
 * @description Busca todos os contratos de manutenção
 * @returns Resposta da API
 */
export async function getMaintenanceContracts(): Promise<GetMaintenanceContractsResponse> {
	try {
		const response = await api.get<HTTPSuccessResponse<MaintenanceContract[]>>(
			"/municipality/maintenance-contracts"
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
