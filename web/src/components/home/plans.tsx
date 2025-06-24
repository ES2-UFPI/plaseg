import { CreditCard } from "lucide-react";
import { PlansCard } from "./plans-card";

export function Plans() {
	return (
		<section id="planos">
			<div className="w-full py-36">
				<div className="flex flex-col gap-8 w-[1200px] mx-auto items-center justify-center">
					<h1 className="text-4xl font-bold leading-tight">
						Planos e Assinaturas
					</h1>

					<div className="w-full flex gap-4 mt-4 items-center">
						<PlansCard />
					</div>

					<div className="flex items-center gap-2 text-muted-foreground text-sm">
						<CreditCard />
						Pagamentos via PIX, boleto ou cartão de crédito.
					</div>
				</div>
			</div>
		</section>
	);
}
