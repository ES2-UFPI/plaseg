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
import { useCreateOpportunity } from "@/hooks/admin/opportunities/use-create-opportunity";

interface CreateOpportunitySheetProps {
	className?: string;
}

export function CreateOpportunitySheet({
	className,
}: CreateOpportunitySheetProps) {
	const { isCreateOpportunitySheetOpen, setIsCreateOpportunitySheetOpen } =
		useCreateOpportunity();

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
					setIsOpportunitySheetOpen={setIsCreateOpportunitySheetOpen}
				/>
			</SheetContent>
		</Sheet>
	);
}
