import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import { Form } from "@/components/ui/form";
import { FormInput } from "../form/form-input";
import { LoaderCircle } from "lucide-react";
import { FormDocumentInput } from "../form/form-document";
import { FormPhoneInput } from "../form/form-phone-input";
import { FormRadioGroup } from "../form/form-radio-group";
import { Link } from "react-router";

const roleOptions = [
	{ label: "Município", value: "MUNICIPALITY" },
	{ label: "Empresa", value: "COMPANY" },
];

export function SignUpForm() {
	const { form, isLoadingSignUp } = useSignUp();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmitForm} className="space-y-4">
				<FormDocumentInput
					form={form}
					entity="document"
					label="CPF/CNPJ"
					placeholder="Digite seu CPF ou CNPJ"
				/>

				<FormInput
					form={form}
					type="text"
					entity="name"
					label="Nome"
					placeholder="Digite o seu nome"
				/>

				<FormInput
					form={form}
					type="email"
					entity="email"
					label="Email"
					placeholder="Digite seu email"
				/>

				<FormPhoneInput
					form={form}
					entity="phone"
					label="Celular"
					placeholder="Digite seu telefone"
				/>

				<FormInput
					form={form}
					type="password"
					entity="password"
					label="Senha"
					placeholder="Digite sua senha"
				/>

				<FormRadioGroup
					form={form}
					entity="role"
					label="Cargo"
					options={roleOptions}
				/>

				<Button
					type="button"
					className="mt-2 w-full"
					disabled={isLoadingSignUp}
					asChild
				>
					<Link to="/cadastrar-municipio">
						{isLoadingSignUp && <LoaderCircle className="animate-spin" />}
						Confirmar
					</Link>
				</Button>
			</form>
		</Form>
	);
}
