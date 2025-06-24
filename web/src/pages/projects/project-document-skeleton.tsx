import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDocumentSkeleton() {
	return (
		<div className="w-full flex flex-col gap-6 py-6">
			<Skeleton className="h-8 w-[300px] rounded-lg bg-slate-200/50" />

			<div className="w-full grid grid-cols-3 gap-6">
				<Skeleton className="h-[400px] rounded-lg bg-slate-200/50" />

				<div className="col-span-2 flex flex-col gap-6">
					<Skeleton className="h-[180px] rounded-lg bg-slate-200/50" />
					<Skeleton className="h-[180px] rounded-lg bg-slate-200/50" />
				</div>
			</div>
		</div>
	);
}
