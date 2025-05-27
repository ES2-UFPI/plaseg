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
import { baseProductsTableColumns } from "./base-products-table-columns";
import { SearchInput } from "@/components/ui/search-input";
import { translateBaseProductsTableKeys } from "@/utils/translate-base-products-table-keys";
import { BaseProductsTable } from "./base-products-table";
import { TablePagination } from "@/components/table/table-footer";
import { TableHideColumnsDropDown } from "@/components/table/table-hide-columns-dropdown";
import { CreateBaseProductSheet } from "../modals/create-base-product-sheet";
import { useGetBaseProducts } from "@/hooks/admin/base-products/use-get-base-products";
import { useGetTypes } from "@/hooks/admin/types/use-get-types";
import { TypeGroup } from "@/@types/admin/type";
import { TableCombobox } from "@/components/table/table-combobox";

export function BaseProductsTableContainer() {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "name",
			desc: false,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { baseProducts, isLoadingGetBaseProducts } = useGetBaseProducts();
	const { types } = useGetTypes({
		group: TypeGroup.CATEGORY,
	});

	const table = useReactTable({
		data: baseProducts,
		columns: baseProductsTableColumns,
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
				<h1 className="text-2xl font-semibold">Produtos Base</h1>
				<span className="text-sm text-muted-foreground">
					Adicione, edite e exclua os produtos base da aplicação.
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex items-center gap-4">
				<SearchInput
					className="w-full xl:w-[300px]"
					placeholder="Pesquisar produtos base..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
				/>

				<TableCombobox
					className="w-full xl:w-[200px]"
					placeholder="Categoria"
					translatedEntity="Categoria"
					onChange={(value) => table.getColumn("type")?.setFilterValue(value)}
					options={types.map((type) => ({
						label: type.description,
						value: type.id,
					}))}
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
					translateFunction={translateBaseProductsTableKeys}
				/>

				<CreateBaseProductSheet className="bg-primary hover:bg-primary/90" />
			</div>

			<BaseProductsTable
				table={table}
				isLoadingGetBaseProducts={isLoadingGetBaseProducts}
				data={baseProducts}
			/>

			<TablePagination table={table} />
		</div>
	);
}
