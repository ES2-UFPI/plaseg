import { Skeleton } from "@/components/ui/skeleton";

export function OpportunityCardSkeleton() {
	return (
		<div
			className="overflow-hidden rounded-2xl border border-border/50 bg-white
		flex flex-col h-[245px]"
		>
			<div className="p-6 flex-1 flex justify-between">
				<div className="space-y-2">
					<Skeleton className="h-7 w-[500px]" />

					<Skeleton className="h-5 w-[180px]" />

					<div className="pt-2">
						<div className="text-sm space-x-2 flex">
							<Skeleton className="h-4 w-[60px]" />
							<Skeleton className="h-4 w-[500px]" />
						</div>
					</div>

					<div className="pt-1">
						<Skeleton className="h-5 w-[70px] rounded-full" />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
					<div className="space-y-1">
						<Skeleton className="h-3 w-[100px]" />
						<Skeleton className="h-5 w-[140px]" />
					</div>

					<div className="space-y-1">
						<Skeleton className="h-3 w-[100px]" />
						<Skeleton className="h-5 w-[140px]" />
					</div>
				</div>
			</div>

			<div className="bg-muted/30 border-t border-border/40 p-4 flex items-center justify-between">
				<div className="flex gap-1 items-center">
					<Skeleton className="h-4 w-[70px]" />
					<Skeleton className="h-4 w-[80px]" />
					<Skeleton className="h-4 w-[10px]" />
					<Skeleton className="h-4 w-[80px]" />
				</div>

				<Skeleton className="h-9 w-[200px] rounded-md" />
			</div>
		</div>
	);
}
