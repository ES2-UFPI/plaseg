import {
	ChevronDown,
	ChevronUp,
	Paperclip,
	Eye,
	Download,
	Trash2,
	Search,
	Upload,
} from "lucide-react";
import { useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

// Sample attachments data based on the image
const attachments = [
	{
		id: 1,
		name: "Diário oficial - criação da guarda municipal",
		size: "2 MB",
	},
	{
		id: 2,
		name: "Anexo 02",
		size: "3,2 MB",
	},
	{
		id: 3,
		name: "Anexo 03",
		size: "3,2 MB",
	},
	{
		id: 4,
		name: "Anexo 04",
		size: "3,2 MB",
	},
];

export function ProjectAttachments() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-full">
			<Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
				<div className="flex items-center gap-2 border-b border-slate-200 pb-4">
					<CollapsibleTrigger className="flex items-center gap-2 w-full ">
						{!isOpen && <ChevronDown className="animate-in spin-in-90" />}

						{isOpen && <ChevronUp className="animate-in spin-in-90" />}

						<h2 className="text-xl font-semibold">Anexos</h2>
					</CollapsibleTrigger>

					<div className="ml-auto flex items-center gap-2">
						<Button variant="outline" size="icon">
							<Search className="h-4 w-4" />
						</Button>

						<Button variant="outline" className="gap-2">
							<Upload className="h-4 w-4" />
							Anexar arquivo
						</Button>
					</div>
				</div>

				<CollapsibleContent className="space-y-4">
					{attachments.map((attachment) => (
						<div
							key={attachment.id}
							className="flex items-center justify-between p-4 bg-white border
							border-slate-200 rounded-lg transition-colors"
						>
							<div className="flex items-center gap-3">
								<Paperclip className="h-5 w-5 text-slate-500" />
								<div className="flex flex-col">
									<span className="font-medium text-slate-900">
										{attachment.name}
									</span>
									<span className="text-sm text-slate-500">
										{attachment.size}
									</span>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Eye className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Download className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					))}
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
