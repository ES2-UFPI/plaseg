import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { LoaderCircle } from "lucide-react";
import { CreateAdministratorRequest } from "@/@schemas/administrator";
import { UseFormReturn } from "react-hook-form";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { FormDocumentInput } from "@/components/form/form-document";

interface AdministratorFormProps {
	form: UseFormReturn<CreateAdministratorRequest> & {
		handleSubmitForm: () => void;
	};
	setIsFormOpen: (open: boolean) => void;
	isLoading: boolean;
}

export function AdministratorForm({
	setIsFormOpen,
	form,
	isLoading,
}: AdministratorFormProps) {
	return (
		<Form {...form}>
			<div className="shadow-none border-muted rounded-lg flex flex-col gap-6">
				<form onSubmit={form.handleSubmitForm} className="space-y-8">
					<div className="space-y-4">
						<FormInput
							form={form}
							entity="name"
							label="Nome"
							placeholder="Digite o nome do administrador"
						/>

						<FormInput
							form={form}
							entity="email"
							label="Email"
							placeholder="Digite o email do administrador"
							type="email"
						/>

						<FormDocumentInput
							form={form}
							entity="document"
							label="Documento"
							placeholder="Digite o documento do administrador"
						/>

						<FormPhoneInput
							form={form}
							entity="phone"
							label="Telefone"
							placeholder="Digite o telefone do administrador"
						/>

						<FormInput
							form={form}
							entity="password"
							label="Senha"
							placeholder="Digite a senha do administrador"
							type="password"
						/>
					</div>

					<div className="flex justify-end gap-2">
						<Button
							className="w-full max-w-[170px]"
							variant="outline"
							onClick={() => setIsFormOpen(false)}
							type="button"
						>
							Cancelar
						</Button>

						<Button className="w-full max-w-[170px]" type="submit">
							{isLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{!isLoading && "Salvar"}
						</Button>
					</div>
				</form>
			</div>
		</Form>
	);
}
