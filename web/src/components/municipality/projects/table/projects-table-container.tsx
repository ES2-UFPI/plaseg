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
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsTableColumns } from "./projects-table-columns";
import { SearchInput } from "@/components/ui/search-input";
import { translateProjectTableKeys } from "@/utils/translate-project-table-keys";
import { ProjectsTable } from "./projects-table";
import { TablePagination } from "@/components/table/table-footer";
import { TableHideColumnsDropDown } from "@/components/table/table-hide-columns-dropdown";
import { useGetProjects } from "@/hooks/municipalities/projects/use-get-projects";
import { Link } from "react-router";

export function ProjectsTableContainer() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const { projects, isLoadingGetProjects } = useGetProjects();

	const table = useReactTable({
		data: projects,
		columns: projectsTableColumns,
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
				<h1 className="text-2xl font-semibold">Projetos</h1>
				<span className="text-sm text-muted-foreground">
					Visualize e gerencie os seus projetos.
				</span>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex items-center gap-4">
				<SearchInput
					className="w-full xl:w-[300px]"
					placeholder="Pesquisar projetos..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
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
					translateFunction={translateProjectTableKeys}
				/>

				<Button
					className="bg-dark hover:bg-dark/90 text-primary-foreground
				transition-colors"
					asChild
				>
					<Link to="/oportunidades">
						<Plus />
						Criar novo projeto
					</Link>
				</Button>
			</div>

			<ProjectsTable
				table={table}
				isLoadingGetProjects={isLoadingGetProjects}
				data={projects}
			/>

			<TablePagination table={table} />
		</div>
	);
}
