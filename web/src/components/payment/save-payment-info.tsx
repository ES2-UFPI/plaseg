import { Checkbox } from "@/components/ui/checkbox";

export function SavePaymentInfo() {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms2" />
			<label
				htmlFor="terms2"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opamunicipality-70"
			>
				Salvar Informações de Pagamento
			</label>
		</div>
	);
}
