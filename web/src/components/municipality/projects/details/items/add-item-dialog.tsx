import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useAddRequestedItem } from "@/hooks/municipalities/projects/use-add-requested-item";
import { AddItemForm } from "./add-item-form";

interface AddItemDialogProps {
	projectId: string;
}

export function AddItemDialog({ projectId }: AddItemDialogProps) {
	const {
		form,
		isAddingRequestedItem,
		isAddRequestedItemSheetOpen,
		setIsAddRequestedItemSheetOpen,
	} = useAddRequestedItem(projectId);

	return (
		<Dialog
			open={isAddRequestedItemSheetOpen}
			onOpenChange={setIsAddRequestedItemSheetOpen}
		>
			<DialogTrigger asChild>
				<Button className="bg-slate-950 hover:bg-slate-950/90 outline-none">
					<Plus className="h-4 w-4 " />
					Adicionar Item
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Item</DialogTitle>

					<DialogDescription>
						Adicione um novo item ao projeto.
					</DialogDescription>
				</DialogHeader>

				<AddItemForm
					form={form}
					isLoading={isAddingRequestedItem}
					setIsFormOpen={setIsAddRequestedItemSheetOpen}
				/>
			</DialogContent>
		</Dialog>
	);
}
