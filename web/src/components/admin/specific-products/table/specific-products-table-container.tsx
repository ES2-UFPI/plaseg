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
import { specificProductsTableColumns } from "./specific-products-table-columns";
import { SearchInput } from "@/components/ui/search-input";
import { translateSpecificProductsTableKeys } from "@/utils/translate-specific-products-table-keys";
import { SpecificProductsTable } from "./specific-products-table";
import { TablePagination } from "@/components/table/table-footer";
import { TableHideColumnsDropDown } from "@/components/table/table-hide-columns-dropdown";
import { CreateSpecificProductSheet } from "../modals/create-specific-product-sheet";
import { useGetSpecificProducts } from "@/hooks/admin/specific-products/use-get-specific-products";
import { useGetBaseProducts } from "@/hooks/admin/base-products/use-get-base-products";
import { TableCombobox } from "@/components/table/table-combobox";

export function SpecificProductsTableContainer() {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "model",
			desc: false,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { specificProducts, isLoadingGetSpecificProducts } =
		useGetSpecificProducts();
	const { baseProducts } = useGetBaseProducts();

	const table = useReactTable({
		data: specificProducts,
		columns: specificProductsTableColumns,
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
				<h1 className="text-2xl font-semibold">Produtos Específicos</h1>
				<span className="text-sm text-muted-foreground">
					Adicione, edite e exclua os produtos específicos da aplicação.
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex items-center gap-4">
				<SearchInput
					className="w-full xl:w-[300px]"
					placeholder="Pesquisar produtos específicos..."
					value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("model")?.setFilterValue(event.target.value)
					}
				/>

				<TableCombobox
					className="w-full xl:w-[200px]"
					placeholder="Produto Base"
					translatedEntity="Produto Base"
					onChange={(value) =>
						table.getColumn("baseProductId")?.setFilterValue(value)
					}
					options={baseProducts.map((product) => ({
						label: product.name,
						value: product.id,
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
					translateFunction={translateSpecificProductsTableKeys}
				/>

				<CreateSpecificProductSheet className="bg-primary hover:bg-primary/90" />
			</div>

			<SpecificProductsTable
				table={table}
				isLoadingGetSpecificProducts={isLoadingGetSpecificProducts}
				data={specificProducts}
			/>

			<TablePagination table={table} />
		</div>
	);
}
