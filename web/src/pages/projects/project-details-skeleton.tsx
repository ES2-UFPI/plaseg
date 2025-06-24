import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsDetailsSkeleton() {
	return (
		<div className="flex flex-col gap-6 py-6">
			<div className="w-full flex flex-col gap-2">
				<Skeleton className="h-[32px] w-[600px] bg-slate-200/50 rounded-lg" />
				<Skeleton className="h-[22px] w-[300px] bg-slate-200/50 rounded-lg" />
			</div>

			<Skeleton className="h-[128px] w-full bg-slate-200/50 rounded-lg" />

			<div className="w-full grid grid-cols-3 gap-6">
				<div className="flex flex-col gap-4 col-span-2">
					<Skeleton className="h-[45px] bg-slate-200/50 rounded-lg" />
					<Skeleton className="h-[400px] bg-slate-200/50 rounded-lg" />
				</div>

				<div className="flex flex-col gap-4">
					<Skeleton className="h-[45px] bg-slate-200/50 rounded-lg" />
					<Skeleton className="h-[400px] bg-slate-200/50 rounded-lg" />
				</div>
			</div>
		</div>
	);
}
