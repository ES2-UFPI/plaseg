interface PaymentPlanProps {
	isSelected?: boolean;
	title: string;
	description: string;
	price: string;
}

export function PaymentPlan({
	isSelected = false,
	title,
	description,
	price,
}: PaymentPlanProps) {
	const selectedClasses = isSelected ? "border-blue-500" : "";

	return (
		<div
			className={`border-2 p-4 rounded-md flex justify-between	hover:bg-slate-50
				hover:cursor-pointer ${selectedClasses}`}
		>
			<div className="flex gap-4">
				<div
					className={`w-5 h-5 border-2 rounded-full flex items-center justify-center
					${isSelected ? "border-blue-500" : "border-slate-300"}`}
				>
					<div
						className={`w-[10px] h-[10px] rounded-full
						${isSelected ? "bg-blue-500" : ""}`}
					/>
				</div>

				<div className="flex flex-col gap-2 w-[230px]">
					<strong>{title}</strong>
					<span className="text-sm text-muted-foreground">{description}</span>
				</div>
			</div>

			<div>
				<strong>{price}</strong>
			</div>
		</div>
	);
}
