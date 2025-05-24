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
import { typesTableColumns } from "./types-table-columns";
import { SearchInput } from "@/components/ui/search-input";
import { translateTypesTableKeys } from "@/utils/translate-types-table-keys";
import { TableSelect } from "@/components/table/table-select";
import { TypesTable } from "./types-table";
import { TablePagination } from "@/components/table/table-footer";
import { TableHideColumnsDropDown } from "@/components/table/table-hide-columns-dropdown";
import { TypeGroup } from "@/@types/admin/type";
import { CreateTypeSheet } from "../modals/create-type-sheet";
import { useGetTypes } from "@/hooks/admin/types/use-get-types";

export function TypesTableContainer() {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "description",
			desc: false,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { types, isLoadingGetTypes } = useGetTypes({});

	const groupOptions = [
		{ label: "Oportunidade", value: TypeGroup.OPPORTUNITY },
		{ label: "Serviço", value: TypeGroup.SERVICE },
		{ label: "Categoria", value: TypeGroup.CATEGORY },
	];

	const table = useReactTable({
		data: types,
		columns: typesTableColumns,
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
				<h1 className="text-2xl font-semibold">Tipos</h1>
				<span className="text-sm text-muted-foreground">
					Adicione, edite e exclua os tipos da aplicação.
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex items-center gap-4">
				<SearchInput
					className="w-full xl:w-[300px]"
					placeholder="Pesquisar tipos..."
					value={
						(table.getColumn("description")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("description")?.setFilterValue(event.target.value)
					}
				/>

				<TableSelect
					options={groupOptions}
					className="w-full xl:w-[200px]"
					placeholder="Grupo"
					onChange={(value) => table.getColumn("group")?.setFilterValue(value)}
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
					translateFunction={translateTypesTableKeys}
				/>

				<CreateTypeSheet />
			</div>

			<TypesTable
				table={table}
				isLoadingGetTypes={isLoadingGetTypes}
				data={types}
			/>

			<TablePagination table={table} />
		</div>
	);
}
