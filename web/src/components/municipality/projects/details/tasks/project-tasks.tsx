import { Separator } from "@/components/ui/separator";
import { CopyCheck } from "lucide-react";

export function ProjectTasks() {
	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-xl font-semibold">Tarefas</h2>

			<Separator />

			<div className="w-full max-w-md mx-auto bg-white rounded-lg border border-slate-200 p-6">
				<div className="flex justify-between items-center mb-4">
					<span className="text-sm text-gray-500">0 de 0 concluídos</span>
				</div>

				<div className="w-full h-[300px] flex items-center justify-center	">
					<div>
						<div className="flex flex-col gap-4 items-center text-muted-foreground">
							<CopyCheck className="w-10 h-10" strokeWidth={1} />
							<span>Nenhuma tarefa disponível!</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
