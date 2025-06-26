import { AddRequestedItemRequest } from "@/@schemas/project";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetBaseProducts } from "@/hooks/admin/base-products/use-get-base-products";
import { useGetAllocationDepartments } from "@/hooks/municipalities/projects/use-get-allocation-departments";
import { useGetMaintenanceContracts } from "@/hooks/municipalities/projects/use-get-maintenance-contracts";
import { LoaderCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormInputSkeleton } from "./form-input-skeleton";

interface AddItemFormProps {
	form: UseFormReturn<AddRequestedItemRequest> & {
		handleSubmitForm: () => void;
	};
	setIsFormOpen: (open: boolean) => void;
	isLoading: boolean;
}

export function AddItemForm({
	setIsFormOpen,
	form,
	isLoading,
}: AddItemFormProps) {
	const { baseProducts, isLoadingGetBaseProducts } = useGetBaseProducts();
	const { maintenanceContracts, isLoadingGetMaintenanceContracts } =
		useGetMaintenanceContracts();
	const { allocationDepartments, isLoadingGetAllocationDepartments } =
		useGetAllocationDepartments();

	return (
		<Form {...form}>
			<div className="shadow-none border-muted rounded-lg flex flex-col gap-6">
				<form onSubmit={form.handleSubmitForm} className="space-y-8">
					<div className="space-y-4">
						<FormInput
							form={form}
							type="number"
							entity="quantity"
							label="Quantidade"
							placeholder="Digite a quantidade do item"
						/>

						{isLoadingGetBaseProducts && (
							<FormInputSkeleton
								label="Produto Base"
								message="Carregando produtos base..."
							/>
						)}

						{!isLoadingGetBaseProducts && (
							<FormSelect
								form={form}
								entity="baseProductId"
								label="Produto Base"
								placeholder="Selecione o produto base"
								options={baseProducts.map((baseProduct) => ({
									label: baseProduct.name,
									value: baseProduct.id,
								}))}
							/>
						)}

						{isLoadingGetAllocationDepartments && (
							<FormInputSkeleton
								label="Departamento de alocação"
								message="Carregando departamentos de alocação..."
							/>
						)}

						{!isLoadingGetAllocationDepartments && (
							<FormSelect
								form={form}
								entity="allocationDepartmentId"
								label="Departamento de alocação"
								placeholder="Selecione o departamento de alocação"
								options={allocationDepartments.map((department) => ({
									label: department.description,
									value: department.id,
								}))}
							/>
						)}

						{isLoadingGetMaintenanceContracts && (
							<FormInputSkeleton
								label="Contrato de manutenção"
								message="Carregando contratos de manutenção..."
							/>
						)}

						{!isLoadingGetMaintenanceContracts && (
							<FormSelect
								form={form}
								entity="maintenanceContractId"
								label="Contrato de manutenção"
								placeholder="Selecione o contrato de manutenção"
								options={maintenanceContracts.map((contract) => ({
									label: contract.description,
									value: contract.id,
								}))}
							/>
						)}
					</div>

					<div className="flex justify-end gap-2">
						<Button
							type="button"
							className="w-full max-w-[170px]"
							variant="outline"
							onClick={() => setIsFormOpen(false)}
							disabled={isLoading}
						>
							Cancelar
						</Button>

						<Button
							className="w-full max-w-[170px] bg-slate-950 hover:bg-slate-950/90"
							type="submit"
							disabled={isLoading}
						>
							{isLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}

							{!isLoading && "Adicionar Item"}
						</Button>
					</div>
				</form>
			</div>
		</Form>
	);
}
