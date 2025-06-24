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
import { OpportunityForm } from "../form/opportunity-form";
import { useState } from "react";

interface CreateOpportunitySheetProps {
	className?: string;
}

export function CreateOpportunitySheet({
	className,
}: CreateOpportunitySheetProps) {
	const [isCreateOpportunitySheetOpen, setIsCreateOpportunitySheetOpen] =
		useState(false);

	return (
		<Sheet
			open={isCreateOpportunitySheetOpen}
			onOpenChange={setIsCreateOpportunitySheetOpen}
		>
			<SheetTrigger asChild>
				<Button className={className}>
					<Plus />
					Adicionar Oportunidade
				</Button>
			</SheetTrigger>

			<SheetContent className="w-full md:max-w-[1000px] outline-none overflow-y-auto flex flex-col gap-6">
				<SheetHeader>
					<SheetTitle>Nova Oportunidade</SheetTitle>
					<SheetDescription>Adicione uma nova oportunidade.</SheetDescription>
				</SheetHeader>

				<OpportunityForm
					setIsFormOpen={setIsCreateOpportunitySheetOpen}
				/>
			</SheetContent>
		</Sheet>
	);
}
