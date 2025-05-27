import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { SquarePen } from "lucide-react";
import { BaseProductForm } from "../form/base-product-form";
import { useUpdateBaseProduct } from "@/hooks/admin/base-products/use-update-base-product";
import { BaseProduct } from "@/@types/admin/base-product";

interface EditBaseProductSheetProps {
	baseProduct: BaseProduct;
}

export function EditBaseProductSheet({ baseProduct }: EditBaseProductSheetProps) {
	const {
		form,
		isUpdatingBaseProduct,
		isUpdateBaseProductSheetOpen,
		setIsUpdateBaseProductSheetOpen,
	} = useUpdateBaseProduct(baseProduct);

	return (
		<Sheet
			open={isUpdateBaseProductSheetOpen}
			onOpenChange={setIsUpdateBaseProductSheetOpen}
		>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<SquarePen className="h-4 w-4" />
					<span className="sr-only">Editar</span>
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[1000px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Editar Produto Base</SheetTitle>
					<SheetDescription>Faça alterações no produto base.</SheetDescription>
				</SheetHeader>

				<BaseProductForm
					form={form}
					setIsFormOpen={setIsUpdateBaseProductSheetOpen}
					isLoading={isUpdatingBaseProduct}
				/>
			</SheetContent>
		</Sheet>
	);
}
