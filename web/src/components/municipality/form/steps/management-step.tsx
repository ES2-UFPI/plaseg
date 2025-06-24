import { FormInput } from "@/components/form/form-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from "lucide-react";
import type { UseFormReturn, useFieldArray } from "react-hook-form";
import type { CreateMunicipalityRequest } from "@/@schemas/municipality-schema";
import { FormCpfInput } from "@/components/form/form-cpf-input";

interface ManagementStepProps {
	form: UseFormReturn<CreateMunicipalityRequest>;
	managementFieldArray: ReturnType<
		typeof useFieldArray<CreateMunicipalityRequest, "managements">
	>;
}

export function ManagementStep({
	form,
	managementFieldArray,
}: ManagementStepProps) {
	const { fields, append, remove } = managementFieldArray;

	const addManagement = () => {
		append({
			initialDate: new Date(),
			endDate: new Date(),
			managerName: "",
			managerCpf: "",
			managerEmail: "",
			managerAddress: "",
			managerPhone: "",
			adminManagerName: "",
			adminManagerCpf: "",
			adminManagerEmail: "",
			adminManagerAddress: "",
			adminManagerPhone: "",
			legislationName: "",
			legislationCpf: "",
			legislationEmail: "",
			legislationAddress: "",
			legislationPhone: "",
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					Responsáveis pela Gestão
				</h2>
				<p className="text-gray-600 mb-8">
					Adicione informações sobre os responsáveis pela gestão.
				</p>
			</div>

			<div className="space-y-6">
				{fields.map((field, index) => (
					<Card key={field.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
							<CardTitle className="text-lg">
								Período de Gestão {index + 1}
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
						<CardContent className="space-y-6">
							{/* Período */}
							<div>
								<h4 className="font-medium text-gray-900 mb-4">Período</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormDatePicker
										form={form}
										entity={`managements.${index}.initialDate`}
										label="Data Inicial"
									/>
									<FormDatePicker
										form={form}
										entity={`managements.${index}.endDate`}
										label="Data Final"
									/>
								</div>
							</div>

							<Separator />

							{/* Gestor */}
							<div>
								<h4 className="font-medium text-gray-900 mb-4">Gestor</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormInput
										form={form}
										entity={`managements.${index}.managerName`}
										label="Nome"
										placeholder="Digite o nome do gestor"
									/>
									<FormCpfInput
										form={form}
										entity={`managements.${index}.managerCpf`}
										label="CPF"
									/>
									<FormInput
										form={form}
										entity={`managements.${index}.managerEmail`}
										label="Email"
										placeholder="Digite o email"
										type="email"
									/>
									<FormPhoneInput
										form={form}
										entity={`managements.${index}.managerPhone`}
										label="Telefone"
									/>
								</div>
								<div className="mt-4">
									<FormTextarea
										form={form}
										entity={`managements.${index}.managerAddress`}
										label="Endereço"
										placeholder="Digite o endereço completo"
										rows={2}
									/>
								</div>
							</div>

							<Separator />

							{/* Gestor Administrativo */}
							<div>
								<h4 className="font-medium text-gray-900 mb-4">
									Gestor Administrativo
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormInput
										form={form}
										entity={`managements.${index}.adminManagerName`}
										label="Nome"
										placeholder="Digite o nome do gestor administrativo"
									/>
									<FormCpfInput
										form={form}
										entity={`managements.${index}.adminManagerCpf`}
										label="CPF"
									/>
									<FormInput
										form={form}
										entity={`managements.${index}.adminManagerEmail`}
										label="Email"
										placeholder="Digite o email"
										type="email"
									/>
									<FormPhoneInput
										form={form}
										entity={`managements.${index}.adminManagerPhone`}
										label="Telefone"
									/>
								</div>
								<div className="mt-4">
									<FormTextarea
										form={form}
										entity={`managements.${index}.adminManagerAddress`}
										label="Endereço"
										placeholder="Digite o endereço completo"
										rows={2}
									/>
								</div>
							</div>

							<Separator />

							{/* Responsável pela Legislação */}
							<div>
								<h4 className="font-medium text-gray-900 mb-4">
									Responsável pela Legislação
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormInput
										form={form}
										entity={`managements.${index}.legislationName`}
										label="Nome"
										placeholder="Digite o nome do responsável"
									/>
									<FormCpfInput
										form={form}
										entity={`managements.${index}.legislationCpf`}
										label="CPF"
									/>
									<FormInput
										form={form}
										entity={`managements.${index}.legislationEmail`}
										label="Email"
										placeholder="Digite o email"
										type="email"
									/>
									<FormPhoneInput
										form={form}
										entity={`managements.${index}.legislationPhone`}
										label="Telefone"
									/>
								</div>
								<div className="mt-4">
									<FormTextarea
										form={form}
										entity={`managements.${index}.legislationAddress`}
										label="Endereço"
										placeholder="Digite o endereço completo"
										rows={2}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				))}

				<Button
					type="button"
					variant="outline"
					onClick={addManagement}
					className="w-full"
				>
					<Plus className="w-4 h-4 mr-2" />
					Adicionar Período de Gestão
				</Button>
			</div>
		</div>
	);
}
