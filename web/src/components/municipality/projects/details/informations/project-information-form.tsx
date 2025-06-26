import { FormInput } from "@/components/form/form-input";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Project } from "@/@schemas/project";
import { useUpdateProjectGeneralInfo } from "@/hooks/municipalities/projects/use-update-project-general-info";
import { FormCpfInput } from "@/components/form/form-cpf-input";
import { FormMoneyInput } from "@/components/form/form-money-input";
import { LoaderCircle } from "lucide-react";

interface ProjectInformationFormProps {
	project: Project;
}

export function ProjectInformationForm({
	project,
}: ProjectInformationFormProps) {
	const { form, isLoadingUpdateProjectGeneralInfo } =
		useUpdateProjectGeneralInfo({ project });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="p-6 rounded-lg border border-slate-200
			bg-white space-y-6"
			>
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<FormCpfInput
							form={form}
							entity="responsibleCpf"
							label="CPF do responsável"
							placeholder="Digite o CPF do responsável"
						/>

						<FormInput
							form={form}
							entity="responsibleName"
							label="Nome do responsável"
							placeholder="Digite o nome do responsável"
						/>

						<FormInput
							form={form}
							type="email"
							entity="responsibleEmail"
							label="Email do responsável"
							placeholder="Digite o email do responsável"
						/>

						<FormPhoneInput
							form={form}
							entity="responsiblePhone"
							label="Telefone do responsável"
							placeholder="Digite o telefone do responsável"
						/>

						<FormMoneyInput
							form={form}
							entity="baseValue"
							label="Valor base"
							placeholder="Digite o valor base do projeto"
						/>
					</div>
				</div>

				<div className="flex justify-end">
					<Button
						className="w-full max-w-[170px] bg-black hover:bg-black/90"
						type="submit"
						disabled={isLoadingUpdateProjectGeneralInfo}
					>
						{isLoadingUpdateProjectGeneralInfo && (
							<LoaderCircle className="animate-spin" />
						)}

						{!isLoadingUpdateProjectGeneralInfo && "Salvar"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
