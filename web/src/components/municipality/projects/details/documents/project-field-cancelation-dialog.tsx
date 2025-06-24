import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectFieldCancelationDialogProps {
	children: React.ReactNode;
}

export function ProjectFieldCancelationDialog({
	children,
}: ProjectFieldCancelationDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Descartar alterações</DialogTitle>

					<DialogDescription>
						Você tem certeza que deseja descartar as alterações?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DialogClose>

					<DialogClose asChild>
						<Button variant="destructive">Descartar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
