import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
	return (
		<div className="flex flex-col gap-8 text-center rounded-lg">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">Resetar senha</h2>
				<span className="text-sm text-muted-foreground">
					Digite seu CPF ou CNPJ para resetar sua senha.
				</span>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 text-left">
					<Label>CPF/CNPJ</Label>

					<Input
						type="email"
						id="email"
						name="email"
						placeholder="Digite seu CPF ou CNPJ"
					/>
				</div>

				<Button className="mt-2">Resetar senha</Button>

				<a href="/entrar" className="text-sm font-medium hover:underline">
					Entrar
				</a>
			</div>
		</div>
	);
}
