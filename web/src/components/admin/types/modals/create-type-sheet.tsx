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
import { TypeForm } from "../form/type-form";
import { useCreateType } from "@/hooks/admin/types/use-create-type";

interface CreateTypeSheetProps {
	className?: string;
}

export function CreateTypeSheet({ className }: CreateTypeSheetProps) {
	const {
		form,
		isAddingType,
		isCreateTypeSheetOpen,
		setIsCreateTypeSheetOpen,
	} = useCreateType();

	return (
		<Sheet open={isCreateTypeSheetOpen} onOpenChange={setIsCreateTypeSheetOpen}>
			<SheetTrigger asChild>
				<Button className={className}>
					<Plus />
					Adicionar Tipo
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[500px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Novo Tipo</SheetTitle>
					<SheetDescription>Adicione um novo tipo.</SheetDescription>
				</SheetHeader>

				<TypeForm
					form={form}
					isLoading={isAddingType}
					setIsFormOpen={setIsCreateTypeSheetOpen}
				/>
			</SheetContent>
		</Sheet>
	);
}
