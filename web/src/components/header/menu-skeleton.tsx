import { Skeleton } from "../ui/skeleton";

export function MenuSkeleton() {
	return (
		<div className="flex items-center justify-between gap-4 w-[220px]">
			<div className="flex flex-col gap-2 flex-1">
				<Skeleton className="w-20 h-4 bg-[#1A202C]" />

				<Skeleton className="w-40 h-4 bg-[#1A202C]" />
			</div>

			<Skeleton className="w-10 h-10 rounded-full bg-[#1A202C]" />
		</div>
	);
}
