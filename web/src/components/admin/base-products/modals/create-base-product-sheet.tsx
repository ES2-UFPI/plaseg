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
import { BaseProductForm } from "../form/base-product-form";
import { useCreateBaseProduct } from "@/hooks/admin/base-products/use-create-base-product";

interface CreateBaseProductSheetProps {
	className?: string;
}

export function CreateBaseProductSheet({
	className,
}: CreateBaseProductSheetProps) {
	const {
		form,
		isAddingBaseProduct,
		isCreateBaseProductSheetOpen,
		setIsCreateBaseProductSheetOpen,
	} = useCreateBaseProduct();

	return (
		<Sheet
			open={isCreateBaseProductSheetOpen}
			onOpenChange={setIsCreateBaseProductSheetOpen}
		>
			<SheetTrigger asChild>
				<Button className={className}>
					<Plus className="h-4 w-4 mr-2" />
					Adicionar Produto Base
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[1000px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Novo Produto Base</SheetTitle>
					<SheetDescription>
						Adicione um novo produto base ao sistema.
					</SheetDescription>
				</SheetHeader>

				<BaseProductForm
					form={form}
					setIsFormOpen={setIsCreateBaseProductSheetOpen}
					isLoading={isAddingBaseProduct}
				/>
			</SheetContent>
		</Sheet>
	);
}
