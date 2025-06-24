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
import { ProjectTypeForm } from "../form/project-type-form";
import { useCreateProjectType } from "@/hooks/admin/project-types/use-create-project-type";

interface CreateProjectTypeSheetProps {
	className?: string;
}

export function CreateProjectTypeSheet({
	className,
}: CreateProjectTypeSheetProps) {
	const {
		form,
		isCreateProjectTypeSheetOpen,
		setIsCreateProjectTypeSheetOpen,
		isLoadingCreateProjectType,
	} = useCreateProjectType();

	return (
		<Sheet
			open={isCreateProjectTypeSheetOpen}
			onOpenChange={setIsCreateProjectTypeSheetOpen}
		>
			<SheetTrigger asChild>
				<Button className={className}>
					<Plus />
					Adicionar Tipo de Projeto
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[600px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Novo Tipo de Projeto</SheetTitle>
					<SheetDescription>Adicione um novo tipo de projeto.</SheetDescription>
				</SheetHeader>

				<ProjectTypeForm
					form={form}
					isLoading={isLoadingCreateProjectType}
					setIsFormOpen={setIsCreateProjectTypeSheetOpen}
				/>
			</SheetContent>
		</Sheet>
	);
}
