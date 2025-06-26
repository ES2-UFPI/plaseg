import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { OpportunitiesTableBodySkeleton } from "./opportunities-table-body-skeleton";
import { opportunitiesTableColumns } from "./opportunities-table-columns";
import { OpportunitiesTableHeader } from "./opportunities-table-header";
import { Opportunity } from "@/@schemas/opportunity";

interface OpportunitiesTableProps {
	table: TableType<Opportunity>;
	isLoadingGetOpportunities: boolean;
	data: Opportunity[];
}

export function OpportunitiesTable({
	table,
	isLoadingGetOpportunities,
	data,
}: OpportunitiesTableProps) {
	return (
		<Table>
			<OpportunitiesTableHeader table={table} />

			<TableBody>
				{!isLoadingGetOpportunities &&
					data &&
					data.length > 0 &&
					table.getRowModel().rows?.length > 0 &&
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}

				{isLoadingGetOpportunities ||
					((!data ||
						data.length === 0 ||
						table.getRowModel().rows?.length === 0) && (
						<TableRow>
							<TableCell
								colSpan={opportunitiesTableColumns.length}
								className="h-24 text-center"
							>
								Sem resultados
							</TableCell>
						</TableRow>
					))}

				{isLoadingGetOpportunities && <OpportunitiesTableBodySkeleton />}
			</TableBody>
		</Table>
	);
}
