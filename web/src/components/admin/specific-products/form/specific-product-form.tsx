import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormMoneyInput } from "@/components/form/form-money-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { LoaderCircle } from "lucide-react";
import { FormTextarea } from "@/components/form/form-textarea";
import { UseFormReturn } from "react-hook-form";
import { FormCombobox } from "@/components/form/form-combobox";
import { CreateSpecificProductRequest } from "@/@schemas/specific-product";
import { useGetBaseProducts } from "@/hooks/admin/base-products/use-get-base-products";

interface SpecificProductFormProps {
	form: UseFormReturn<CreateSpecificProductRequest> & {
		handleSubmitForm: () => void;
	};
	setIsFormOpen: (open: boolean) => void;
	isLoading: boolean;
}

export function SpecificProductForm({
	setIsFormOpen,
	form,
	isLoading,
}: SpecificProductFormProps) {
	const { baseProducts } = useGetBaseProducts();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="shadow-none border-muted rounded-lg flex flex-col justify-between flex-1
				px-4 pb-4"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="grid grid-cols-2 col-span-3 gap-4">
						<FormInput
							form={form}
							entity="brand"
							label="Marca"
							placeholder="Digite a marca do produto"
						/>

						<FormInput
							form={form}
							entity="model"
							label="Modelo"
							placeholder="Digite o modelo do produto"
						/>

						<FormMoneyInput
							form={form}
							entity="unitValue"
							label="Valor Unitário"
							placeholder="0,00"
						/>

						<FormInput
							form={form}
							entity="warrantyMonths"
							label="Meses de Garantia"
							placeholder="Digite os meses de garantia"
							type="number"
						/>

						<FormCombobox
							form={form}
							entity="baseProductId"
							translatedEntity="Produto Base"
							emptyMessage="Nenhum produto base encontrado"
							placeholder="Selecione o produto base"
							options={baseProducts.map((product) => ({
								label: product.name,
								value: product.id,
							}))}
						/>
					</div>

					<div className="col-span-1 md:col-span-2 lg:col-span-3">
						<FormTextarea
							form={form}
							entity="description"
							label="Descrição"
							placeholder="Digite a descrição do produto específico"
						/>
					</div>

					<FormMoneyInput
						form={form}
						entity="budget"
						label="Orçamento"
						placeholder="0,00"
					/>

					<FormDatePicker
						form={form}
						entity="budgetValidity"
						label="Validade do Orçamento"
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
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
		</Form>
	);
}
