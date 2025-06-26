import { ArrowDownUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Project } from "@/@schemas/project";
import { AddItemDialog } from "./add-item-dialog";
import { formatCurrency } from "@/utils/format-currency";
import { TableActionButton } from "@/components/table/table-action-button";
import { SearchInput } from "@/components/ui/search-input";
import { ReferenceTermDialog } from "./reference-term-dialog";

interface ProjectItemsProps {
	project: Project;
}

export function ProjectItems({ project }: ProjectItemsProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="w-full">
			<Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
				<div className="flex items-center gap-2 border-b border-slate-200 pb-4">
					<CollapsibleTrigger className="flex items-center gap-2 w-full ">
						{!isOpen && <ChevronDown className="animate-in spin-in-90" />}

						{isOpen && <ChevronUp className="animate-in spin-in-90" />}

						<h2 className="text-xl font-semibold">Itens do projeto</h2>
					</CollapsibleTrigger>

					<div className="ml-auto flex items-center gap-2">
						<SearchInput
							className="w-full xl:w-[300px] bg-white"
							placeholder="Pesquisar itens..."
							value={""}
							onChange={() => {}}
						/>

						<AddItemDialog projectId={project.id} />
					</div>
				</div>

				<CollapsibleContent className="space-y-4">
					<div className="rounded-md border bg-white overflow-hidden">
						<Table>
							<TableHeader className="border-b border-slate-200">
								<TableRow className="bg-white">
									<TableHead className="w-16">N°</TableHead>

									<TableHead className="w-[250px]">
										<div className="flex items-center gap-2">
											Nome
											<ArrowDownUp className="h-4 w-4 text-muted-foreground" />
										</div>
									</TableHead>

									<TableHead>
										<div className="flex items-center gap-2">
											Valor Unitário
											<ArrowDownUp className="h-4 w-4 text-muted-foreground" />
										</div>
									</TableHead>

									<TableHead>
										<div className="flex items-center gap-2">
											Quantidade
											<ArrowDownUp className="h-4 w-4 text-muted-foreground" />
										</div>
									</TableHead>

									<TableHead>
										<div className="flex items-center gap-2">
											Valor Total
											<ArrowDownUp className="h-4 w-4 text-muted-foreground" />
										</div>
									</TableHead>

									<TableHead className="w-12"></TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{project.requestedItems.map((item, index) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">{index + 1}</TableCell>

										<TableCell>
											<div className="flex items-center gap-2">
												{item.baseProduct.name}
											</div>
										</TableCell>

										<TableCell>{item.quantity}</TableCell>

										<TableCell>
											{formatCurrency(item.baseProduct.unitValue)}
										</TableCell>

										<TableCell>
											{formatCurrency(
												item.baseProduct.unitValue * item.quantity
											)}
										</TableCell>

										<TableCell className="flex items-center gap-4">
											<TableActionButton type="edit" disabled />
											<TableActionButton type="delete" disabled />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{project.requestedItems.length === 0 && (
							<div className="h-[100px] w-full bg-white flex items-center justify-center">
								<span className="text-muted-foreground">
									Nenhum item adicionado
								</span>
							</div>
						)}
					</div>
				</CollapsibleContent>

				<div className="flex w-full justify-end">
					<ReferenceTermDialog />
				</div>
			</Collapsible>
		</div>
	);
}
