import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormMoneyInput } from "@/components/form/form-money-input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { useCreateOpportunity } from "@/hooks/admin/opportunities/use-create-opportunity";

interface OpportunityFormProps {
	setIsOpportunitySheetOpen: (open: boolean) => void;
}

export function OpportunityForm({
	setIsOpportunitySheetOpen,
}: OpportunityFormProps) {
	const { form, isAddingOpportunity } = useCreateOpportunity();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="flex-1 flex flex-col justify-between px-4 pb-4"
			>
				<div className="grid grid-cols-3 gap-6">
					<FormInput
						form={form}
						entity="title"
						label="Título"
						placeholder="Digite o título da oportunidade"
					/>

					<FormDatePicker
						form={form}
						entity="initialDeadline"
						label="Data de Início"
					/>

					<FormDatePicker
						form={form}
						entity="finalDeadline"
						label="Data de Término"
					/>

					<FormMoneyInput
						form={form}
						entity="minValue"
						label="Valor Mínimo de Financiamento"
						placeholder="Digite o valor mínimo"
					/>

					<FormMoneyInput
						form={form}
						entity="maxValue"
						label="Valor Máximo de Financiamento"
						placeholder="Digite o valor máximo"
					/>

					<FormInput
						form={form}
						entity="description"
						label="Descrição"
						placeholder="Digite a descrição da oportunidade"
					/>

					<div className="col-span-3 flex flex-col gap-2">
						<div className="flex items-center">
							<Label>Documentação Obrigatória</Label>
							<span className="text-destructive ml-1">*</span>
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<Button
						className="w-full max-w-[170px]"
						variant="outline"
						onClick={() => setIsOpportunitySheetOpen(false)}
					>
						Cancelar
					</Button>

					<Button className="w-full max-w-[170px]" type="submit">
						{isAddingOpportunity && (
							<LoaderCircle className="mr-2 animate-spin" />
						)}
						{!isAddingOpportunity && "Salvar"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
