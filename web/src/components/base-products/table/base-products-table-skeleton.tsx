import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface BaseProductsTableSkeletonProps {
	widths?: string[];
}

export function BaseProductsTableBodySkeleton({
	widths = ["w-4 h-4 shadow-sm"],
}: BaseProductsTableSkeletonProps) {
	return (
		<>
			{Array.from({ length: 10 }).map((_, index) => (
				<TableRow key={index} className="border-none">
					{Array.from({ length: 8 }).map((_, i) => (
						<TableCell key={i} className="h-14">
							<Skeleton className={`h-5 ${widths[i] || "w-full"}`} />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
