import { SignInForm } from "@/components/sign-in/sign-in-form";
import { Link } from "react-router";

export default function SignIn() {
	return (
		<div className="flex flex-col gap-8 text-center rounded-lg">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">Conecte-se</h2>
				<span className="text-sm text-muted-foreground">
					Digite suas credenciais para acessar sua conta.
				</span>
			</div>

			<div className="flex flex-col gap-4">
				<SignInForm />

				<Link
					to="/esqueceu-senha"
					className="text-sm font-medium hover:underline"
				>
					Esqueceu sua senha? Clique aqui
				</Link>

				<Link to="/cadastro" className="text-sm font-medium hover:underline">
					Ainda não tem uma conta? Cadastre-se
				</Link>
			</div>
		</div>
	);
}
