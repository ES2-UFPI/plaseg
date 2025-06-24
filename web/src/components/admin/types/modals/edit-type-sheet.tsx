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
import { TypeForm } from "../form/type-form";
import { useEditType } from "@/hooks/admin/types/use-edit-type";
import { Type } from "@/@types/admin/type";

interface EditTypeSheetProps {
	type: Type;
}

export function EditTypeSheet({ type }: EditTypeSheetProps) {
	const { isEditTypeSheetOpen, setIsEditTypeSheetOpen, form, isEditingType } =
		useEditType(type);

	return (
		<Sheet open={isEditTypeSheetOpen} onOpenChange={setIsEditTypeSheetOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<SquarePen />
					<span className="sr-only">Editar</span>
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[500px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Editar Tipo</SheetTitle>
					<SheetDescription>Faça alterações no tipo de.</SheetDescription>
				</SheetHeader>

				<TypeForm
					form={form}
					setIsFormOpen={setIsEditTypeSheetOpen}
					isLoading={isEditingType}
				/>
			</SheetContent>
		</Sheet>
	);
}
