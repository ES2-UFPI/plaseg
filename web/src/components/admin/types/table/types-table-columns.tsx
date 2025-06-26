import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { translateTypesTableKeys } from "@/utils/translate-types-table-keys";
import { Type, TypeGroup } from "@/@types/admin/type";
import { formatDate } from "@/utils/format-date";
import { Tag } from "@/components/ui/tag";
import { EditTypeSheet } from "../modals/edit-type-sheet";

export const typesTableColumns: ColumnDef<Type>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateTypesTableKeys("description")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => (
			<div className="capitalize font-semibold">
				{row.getValue("description")}
			</div>
		),
	},
	{
		accessorKey: "group",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateTypesTableKeys("group")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => {
			const group = row.getValue("group") as TypeGroup;

			const groupLabels = {
				[TypeGroup.OPPORTUNITY]: "Oportunidade",
				[TypeGroup.SERVICE]: "Serviço",
				[TypeGroup.CATEGORY]: "Categoria",
			};

			return <Tag>{groupLabels[group] || group}</Tag>;
		},
	},
	{
		accessorKey: "parent",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateTypesTableKeys("parent")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => {
			const parent = row.getValue("parent") as string | null;
			return <div>{parent || "-"}</div>;
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateTypesTableKeys("createdAt")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
		sortingFn: "datetime",
	},
	{
		id: "actions",
		header: "Ações",
		cell: ({ row }) => {
			const type = row.original;

			return (
				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" disabled>
						<Eye />
						<span className="sr-only">Ver detalhes</span>
					</Button>

					<EditTypeSheet type={type} />
				</div>
			);
		},
	},
];
