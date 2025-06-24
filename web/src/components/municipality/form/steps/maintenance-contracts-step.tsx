import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import type { UseFormReturn, useFieldArray } from "react-hook-form";
import type { CreateMunicipalityRequest } from "@/@schemas/municipality-schema";

interface MaintenanceContractsStepProps {
	form: UseFormReturn<CreateMunicipalityRequest>;
	contractsFieldArray: ReturnType<
		typeof useFieldArray<CreateMunicipalityRequest, "maintenanceContracts">
	>;
}

export function MaintenanceContractsStep({
	form,
	contractsFieldArray,
}: MaintenanceContractsStepProps) {
	const { fields, append, remove } = contractsFieldArray;

	const addContract = () => {
		append({
			description: "",
			attachment: "",
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Contratos de Manutenção
				</h2>
				<p className="text-gray-600 mb-8">
					Adicione informações sobre os contratos de manutenção.
				</p>
			</div>

			<div className="space-y-4">
				{fields.length === 0 ? (
					<Card>
						<CardContent className="pt-6">
							<p className="text-center text-gray-500">
								Nenhum contrato adicionado ainda.
							</p>
						</CardContent>
					</Card>
				) : (
					fields.map((field, index) => (
						<Card key={field.id}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<CardTitle className="text-lg">Contrato {index + 1}</CardTitle>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => remove(index)}
									className="text-red-600 hover:text-red-700"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormTextarea
									form={form}
									entity={`maintenanceContracts.${index}.description`}
									label="Descrição"
									placeholder="Descreva o contrato de manutenção"
									rows={3}
								/>

								<FormInput
									form={form}
									entity={`maintenanceContracts.${index}.attachment`}
									label="Anexo"
									placeholder="URL ou caminho do anexo"
								/>
							</CardContent>
						</Card>
					))
				)}

				<Button
					type="button"
					variant="outline"
					onClick={addContract}
					className="w-full"
				>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar Contrato
				</Button>
			</div>
		</div>
	);
}
