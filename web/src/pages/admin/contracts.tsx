import { FileText } from "lucide-react";

export default function Contracts() {
	return (
		<div className="flex flex-col py-4 md:py-6 h-[calc(100vh-10rem)]">
			<div
				className="flex-1 flex flex-col gap-2 items-center justify-center w-full border rounded-lg
			border-dashed bg-white"
			>
				<div className="w-20 h-20 flex items-center justify-center rounded-full bg-muted">
					<FileText size={48} strokeWidth={1} />
				</div>

				<h2 className="text-xl font-semibold">Contratos</h2>

				<span className="text-muted-foreground">Página não disponível</span>
			</div>
		</div>
	);
}
