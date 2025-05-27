import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { SpecificProductForm } from "../form/specific-product-form";
import { useCreateSpecificProduct } from "@/hooks/admin/specific-products/use-create-specific-products";

interface CreateSpecificProductSheetProps {
	className?: string;
}

export function CreateSpecificProductSheet({
	className,
}: CreateSpecificProductSheetProps) {
	const {
		form,
		isAddingSpecificProduct,
		isCreateSpecificProductSheetOpen,
		setIsCreateSpecificProductSheetOpen,
	} = useCreateSpecificProduct();

	return (
		<Sheet
			open={isCreateSpecificProductSheetOpen}
			onOpenChange={setIsCreateSpecificProductSheetOpen}
		>
			<SheetTrigger asChild>
				<Button className={className}>
					<Plus className="h-4 w-4 mr-2" />
					Adicionar Produto Específico
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[1000px] outline-none overflow-y-auto flex flex-col">
				<SheetHeader>
					<SheetTitle>Novo Produto Específico</SheetTitle>
					<SheetDescription>
						Adicione um novo produto específico ao sistema.
					</SheetDescription>
				</SheetHeader>

				<SpecificProductForm
					form={form}
					setIsFormOpen={setIsCreateSpecificProductSheetOpen}
					isLoading={isAddingSpecificProduct}
				/>
			</SheetContent>
		</Sheet>
	);
}
