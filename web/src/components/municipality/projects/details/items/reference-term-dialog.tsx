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

export function ReferenceTermDialog() {
	const handleConfirm = () => {
		console.log("Gerando termo de referência...");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Gerar termo de referência</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Gerar Termo de Referência</DialogTitle>

					<DialogDescription>
						Confirme que você adicionou todos os produtos que precisará no seu
						projeto antes de gerar o documento de termo de referência.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex gap-2">
					<DialogClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DialogClose>

					<Button
						className="bg-slate-950 hover:bg-slate-950/90 outline-none"
						onClick={handleConfirm}
						disabled
					>
						Confirmar e Gerar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
