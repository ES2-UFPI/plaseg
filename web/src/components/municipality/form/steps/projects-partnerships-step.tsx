import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import type { UseFormReturn, useFieldArray } from "react-hook-form";
import type { CreateMunicipalityRequest } from "@/@schemas/municipality-schema";

interface ProjectsPartnershipsStepProps {
	form: UseFormReturn<CreateMunicipalityRequest>;
	projectsFieldArray: ReturnType<
		typeof useFieldArray<CreateMunicipalityRequest, "projectsPartnerships">
	>;
}

export function ProjectsPartnershipsStep({
	form,
	projectsFieldArray,
}: ProjectsPartnershipsStepProps) {
	const { fields, append, remove } = projectsFieldArray;

	const addProject = () => {
		append({
			term: "",
			agency: "",
			objective: "",
			status: "",
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Projetos Anteriores
				</h2>
				<p className="text-gray-600 mb-8">
					Adicione informações sobre projetos e parcerias anteriores.
				</p>
			</div>

			<div className="space-y-4">
				{fields.length === 0 ? (
					<Card>
						<CardContent className="pt-6">
							<p className="text-center text-gray-500">
								Nenhum projeto adicionado ainda.
							</p>
						</CardContent>
					</Card>
				) : (
					fields.map((field, index) => (
						<Card key={field.id}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
								<CardTitle className="text-lg">Projeto {index + 1}</CardTitle>
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
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormInput
										form={form}
										entity={`projectsPartnerships.${index}.term`}
										label="Termo"
										placeholder="Digite o termo"
									/>

									<FormInput
										form={form}
										entity={`projectsPartnerships.${index}.agency`}
										label="Órgão"
										placeholder="Digite o órgão"
									/>

									<FormInput
										form={form}
										entity={`projectsPartnerships.${index}.status`}
										label="Status"
										placeholder="Digite o status"
									/>
								</div>

								<FormTextarea
									form={form}
									entity={`projectsPartnerships.${index}.objective`}
									label="Objetivo"
									placeholder="Descreva o objetivo do projeto"
									rows={3}
								/>
							</CardContent>
						</Card>
					))
				)}

				<Button
					type="button"
					variant="outline"
					onClick={addProject}
					className="w-full"
				>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar Projeto
				</Button>
			</div>
		</div>
	);
}
