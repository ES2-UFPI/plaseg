import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="bg-slate-50 w-1/2 h-full flex items-center justify-center">
				<h1 className="text-4xl font-bold">Plaseg</h1>
			</div>

			<div className="w-1/2 h-full flex items-center justify-center">
				<div className="flex flex-col gap-4 text-center">
					<div>
						<strong className="text-2xl">Crie sua conta</strong>
						<p className="">
							Digite seu nome, email e senha para criar uma conta
						</p>
					</div>

					<div className="space-y-2">
						<Label>Nome</Label>
						<Input type="text" placeholder="Digite seu nome" />
					</div>

					<div className="space-y-2">
						<Label>Email</Label>
						<Input type="email" placeholder="Digite seu email" />
					</div>

					<div className="space-y-2">
						<Label>Senha</Label>
						<Input type="password" placeholder="Digite sua senha" />
					</div>

					<Button>Criar conta</Button>
				</div>
			</div>
		</div>
	);
}