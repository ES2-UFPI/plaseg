import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import type { UseFormReturn, useFieldArray } from "react-hook-form";
import type { CreateMunicipalityRequest } from "@/@schemas/municipality-schema";

interface QualifiedStaffStepProps {
	form: UseFormReturn<CreateMunicipalityRequest>;
	staffFieldArray: ReturnType<
		typeof useFieldArray<CreateMunicipalityRequest, "qualifiedStaff">
	>;
}

const employmentTypeOptions = [
	{ value: "CLT", label: "CLT" },
	{ value: "ESTATUTARIO", label: "Estatutário" },
	{ value: "TERCEIRIZADO", label: "Terceirizado" },
	{ value: "ESTAGIARIO", label: "Estagiário" },
];

export function QualifiedStaffStep({
	form,
	staffFieldArray,
}: QualifiedStaffStepProps) {
	const { fields, append, remove } = staffFieldArray;

	const addStaffMember = () => {
		append({
			name: "",
			sector: "",
			education: "",
			experience: "",
			employmentType: "CLT",
			document: "",
			isResponsible: false,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Equipe Qualificada
				</h2>
				<p className="text-gray-600 mb-8">
					Adicione os membros da equipe qualificada do município.
				</p>
			</div>

			<div className="space-y-4">
				{fields.map((field, index) => (
					<Card key={field.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
							<CardTitle className="text-lg">
								Membro da Equipe {index + 1}
							</CardTitle>
							{fields.length > 1 && (
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => remove(index)}
									className="text-red-600 hover:text-red-700"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							)}
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormInput
									form={form}
									entity={`qualifiedStaff.${index}.name`}
									label="Nome"
									placeholder="Digite o nome"
								/>

								<FormInput
									form={form}
									entity={`qualifiedStaff.${index}.sector`}
									label="Setor"
									placeholder="Digite o setor"
								/>

								<FormInput
									form={form}
									entity={`qualifiedStaff.${index}.education`}
									label="Escolaridade"
									placeholder="Digite a escolaridade"
								/>

								<FormInput
									form={form}
									entity={`qualifiedStaff.${index}.experience`}
									label="Experiência"
									placeholder="Digite a experiência"
								/>

								<FormSelect
									form={form}
									entity={`qualifiedStaff.${index}.employmentType`}
									label="Tipo de Vínculo"
									placeholder="Selecione o tipo"
									options={employmentTypeOptions}
								/>

								<FormInput
									form={form}
									entity={`qualifiedStaff.${index}.document`}
									label="Documento"
									placeholder="Digite o documento"
								/>
							</div>

							<FormCheckbox
								form={form}
								entity={`qualifiedStaff.${index}.isResponsible`}
								label="É responsável técnico"
							/>
						</CardContent>
					</Card>
				))}

				<Button
					type="button"
					variant="outline"
					onClick={addStaffMember}
					className="w-full"
				>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar Membro da Equipe
				</Button>
			</div>
		</div>
	);
}
