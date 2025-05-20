import { useSignIn } from "@/hooks/auth/use-sign-in";
import { FormInput } from "../form/form-input";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

export function SignInForm() {
	const { form, isLoadingSignIn } = useSignIn();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmitForm} className="space-y-6">
				<FormInput
					form={form}
					type="email"
					entity="email"
					label="Email"
					placeholder="Digite seu email"
				/>

				<FormInput
					form={form}
					type="password"
					entity="password"
					label="Senha"
					placeholder="Digite sua senha"
				/>

				<span className="text-xs block text-left">
					A senha deve possuir no mínimo 8 caracteres. Deve conter pelo menos um
					número, uma letra maiúscula e um caractere especial.
				</span>

				<Button
					type="submit"
					className="mt-2 w-full"
					disabled={isLoadingSignIn}
				>
					{isLoadingSignIn && <LoaderCircle className="animate-spin" />}
					Entrar
				</Button>
			</form>
		</Form>
	);
}
