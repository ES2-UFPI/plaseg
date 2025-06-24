import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormMoneyInput } from "@/components/form/form-money-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { LoaderCircle } from "lucide-react";
import { FormTextarea } from "@/components/form/form-textarea";
import { TypeGroup } from "@/@types/admin/type";
import { useGetTypes } from "@/hooks/admin/types/use-get-types";
import { UseFormReturn } from "react-hook-form";
import { FormCombobox } from "@/components/form/form-combobox";
import { CreateBaseProductRequest } from "@/@schemas/base-product";

interface BaseProductFormProps {
	form: UseFormReturn<CreateBaseProductRequest> & {
		handleSubmitForm: () => void;
	};
	setIsFormOpen: (open: boolean) => void;
	isLoading: boolean;
}

export function BaseProductForm({
	setIsFormOpen,
	form,
	isLoading,
}: BaseProductFormProps) {
	const { types } = useGetTypes({
		group: TypeGroup.CATEGORY,
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="shadow-none border-muted rounded-lg flex flex-col justify-between flex-1"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="grid grid-cols-2 col-span-3 gap-4">
						<FormInput
							form={form}
							entity="code"
							label="Código"
							placeholder="Digite o código do produto"
						/>

						<FormInput
							form={form}
							entity="name"
							label="Nome"
							placeholder="Digite o nome do produto"
						/>

						<FormMoneyInput
							form={form}
							entity="unitValue"
							label="Valor Unitário"
							placeholder="0,00"
						/>

						<FormCombobox
							form={form}
							entity="typeId"
							translatedEntity="Categoria"
							emptyMessage="Nenhuma categoria encontrada"
							placeholder="Selecione a categoria do produto"
							options={types.map((type) => ({
								label: type.description,
								value: type.id,
							}))}
						/>
					</div>

					<div className="col-span-1 md:col-span-2 lg:col-span-3">
						<FormTextarea
							form={form}
							entity="technicalDescription"
							label="Descrição Técnica"
							placeholder="Digite a descrição técnica do produto"
						/>
					</div>

					<FormMoneyInput
						form={form}
						entity="budget1"
						label="Orçamento 1"
						placeholder="0,00"
					/>

					<FormDatePicker
						form={form}
						entity="budget1Validity"
						label="Validade do Orçamento 1"
					/>

					<FormMoneyInput
						form={form}
						entity="budget2"
						label="Orçamento 2"
						placeholder="0,00"
					/>

					<FormDatePicker
						form={form}
						entity="budget2Validity"
						label="Validade do Orçamento 2"
					/>

					<FormMoneyInput
						form={form}
						entity="budget3"
						label="Orçamento 3"
						placeholder="0,00"
					/>

					<FormDatePicker
						form={form}
						entity="budget3Validity"
						label="Validade do Orçamento 3"
					/>
				</div>

				<div className="flex justify-end gap-2">
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
