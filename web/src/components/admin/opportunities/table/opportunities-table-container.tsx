"use client";
import * as React from "react";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { opportunitiesTableColumns } from "./opportunities-table-columns";
import { SearchInput } from "@/components/ui/search-input";
import { translateOpportunitiesTableKeys } from "@/utils/translate-opportunities-table-keys";
import { useGetOpportunities } from "@/hooks/admin/opportunities/use-get-opportunities";
import { TableSelect } from "@/components/table/table-select";
import { CreateOpportunitySheet } from "../modals/create-opportunity-sheet";
import { OpportunitiesTable } from "./opportunities-table";
import { TablePagination } from "@/components/table/table-footer";
import { TableHideColumnsDropDown } from "@/components/table/table-hide-columns-dropdown";

export function OpportunitiesTableContainer() {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "maxFundingAmount",
			desc: true,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { opportunities, isLoadingGetOpportunities } = useGetOpportunities();

	const table = useReactTable({
		data: opportunities,
		columns: opportunitiesTableColumns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full space-y-4 bg-white p-4 border border-muted rounded-lg">
			<div>
				<h1 className="text-2xl font-semibold">Oportunidades</h1>
				<span className="text-sm text-muted-foreground">
					Adicione, edite e exclua as oportunidades da aplicação.
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex items-center gap-4">
				<SearchInput
					className="w-full xl:w-[300px]"
					placeholder="Pesquisar oportunidades..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
				/>

				<TableSelect
					options={[
						{
							label: "Todos",
							value: "all",
						},
						{
							label: "Edital",
							value: "edital",
						},
					]}
					className="w-full xl:w-[200px]"
					placeholder="Tipo"
					onChange={(value) =>
						table.getColumn("typeDescription")?.setFilterValue(value)
					}
				/>

				<Button
					variant="secondary"
					className="font-semibold"
					onClick={() => [table.resetSorting(), table.resetColumnFilters()]}
				>
					<X />
					Limpar Filtros
				</Button>

				<TableHideColumnsDropDown
					table={table}
					translateFunction={translateOpportunitiesTableKeys}
				/>

				<CreateOpportunitySheet className="font-semibold" />
			</div>

			<OpportunitiesTable
				table={table}
				isLoadingGetOpportunities={isLoadingGetOpportunities}
				data={opportunities}
			/>

			<TablePagination table={table} />
		</div>
	);
}
