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
import { AdministratorForm } from "../form/administrator-form";
import { useCreateAdministrator } from "@/hooks/admin/administrators/use-create-administrator";

interface CreateAdministratorSheetProps {
	className?: string;
}

export function CreateAdministratorSheet({
	className,
}: CreateAdministratorSheetProps) {
	const {
		form,
		isCreatingAdministrator,
		isCreateAdministratorSheetOpen,
		setIsCreateAdministratorSheetOpen,
	} = useCreateAdministrator();

	return (
		<Sheet
			open={isCreateAdministratorSheetOpen}
			onOpenChange={setIsCreateAdministratorSheetOpen}
		>
			<SheetTrigger asChild>
				<Button className={className}>
					<Plus className="h-4 w-4 mr-2" />
					Adicionar Administrador
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[600px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Novo Administrador</SheetTitle>
					<SheetDescription>
						Adicione um novo administrador ao sistema.
					</SheetDescription>
				</SheetHeader>

				<AdministratorForm
					setIsFormOpen={setIsCreateAdministratorSheetOpen}
					form={form}
					isLoading={isCreatingAdministrator}
				/>
			</SheetContent>
		</Sheet>
	);
}
