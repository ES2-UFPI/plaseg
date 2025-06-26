import { CreateMunicipalityRequest } from "@/@schemas/municipality-schema";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import type { UseFormReturn, useFieldArray } from "react-hook-form";

interface AllocationDepartmentsStepProps {
	form: UseFormReturn<CreateMunicipalityRequest>;
	departmentsFieldArray: ReturnType<
		typeof useFieldArray<CreateMunicipalityRequest, "allocationDepartments">
	>;
}

export function AllocationDepartmentsStep({
	form,
	departmentsFieldArray,
}: AllocationDepartmentsStepProps) {
	const { fields, append, remove } = departmentsFieldArray;

	const addDepartment = () => {
		append({
			description: "",
			address: "",
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Setores de Alocações de Bens
				</h2>
				<p className="text-gray-600 mb-8">
					Adicione informações sobre os setores de alocação de bens.
				</p>
			</div>

			<div className="space-y-4">
				{fields.length === 0 ? (
					<Card>
						<CardContent className="pt-6">
							<p className="text-center text-gray-500">
								Nenhum setor adicionado ainda.
							</p>
						</CardContent>
					</Card>
				) : (
					fields.map((field, index) => (
						<Card key={field.id}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<CardTitle className="text-lg">Setor {index + 1}</CardTitle>
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
									entity={`allocationDepartments.${index}.description`}
									label="Descrição"
									placeholder="Descreva o setor"
									rows={3}
								/>

								<FormTextarea
									form={form}
									entity={`allocationDepartments.${index}.address`}
									label="Endereço"
									placeholder="Digite o endereço completo"
									rows={2}
								/>
							</CardContent>
						</Card>
					))
				)}

				<Button
					type="button"
					variant="outline"
					onClick={addDepartment}
					className="w-full"
				>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar Setor
				</Button>
			</div>
		</div>
	);
}
