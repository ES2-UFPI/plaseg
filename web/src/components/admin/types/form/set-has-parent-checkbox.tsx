import { Checkbox } from "@/components/ui/checkbox";

interface SetHasParentCheckboxProps {
	hasParent: boolean;
	setHasParent: (value: boolean) => void;
}

export function SetHasParentCheckbox({
	hasParent,
	setHasParent,
}: SetHasParentCheckboxProps) {
	return (
		<div className="flex items-center space-x-2 cursor-pointer">
			<Checkbox
				id="terms"
				checked={hasParent}
				onCheckedChange={() => setHasParent(!hasParent)}
			/>

			<label
				htmlFor="terms"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
			>
				Possui um tipo pai?
			</label>
		</div>
	);
}
