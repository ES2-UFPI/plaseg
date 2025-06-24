import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface OpportunitiesTableSkeletonProps {
	widths?: string[];
}

export function OpportunitiesTableBodySkeleton({
	widths = ["w-4 h-4 shadow-sm"],
}: OpportunitiesTableSkeletonProps) {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<TableRow key={i} className="border-none">
					{Array.from({ length: 7 }).map((_, j) => (
						<TableCell key={j} className="h-14">
							<Skeleton className={`h-5 ${widths[j] || "w-full"}`} />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
