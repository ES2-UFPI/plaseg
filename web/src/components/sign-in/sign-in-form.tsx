import { useSignIn } from "@/hooks/auth/use-sign-in";
import { LoaderCircle } from "lucide-react";
import { FormInput } from "../form/form-input";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

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
