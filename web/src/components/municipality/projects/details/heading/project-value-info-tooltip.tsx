import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ProjectValueInfoTooltipProps {
	text: string;
}

export function ProjectValueInfoTooltip({
	text,
}: ProjectValueInfoTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Info className="w-3 h-3 flex items-center justify-center text-muted-foreground" />
				</TooltipTrigger>

				<TooltipContent className="bg-white text-black border shadow-sm max-w-[250px] text-center">
					{text}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
