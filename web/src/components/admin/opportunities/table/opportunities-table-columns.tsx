import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Eye, SquarePen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { translateOpportunitiesTableKeys } from "@/utils/translate-opportunities-table-keys";
import { Opportunity } from "@/@types/common/opportunity";
import { formatDate } from "@/utils/format-date";
import { Tag } from "@/components/ui/tag";
import { Switch } from "@/components/ui/switch";

export const opportunitiesTableColumns: ColumnDef<Opportunity>[] = [
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
		accessorKey: "title",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateOpportunitiesTableKeys("title")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => (
			<div className="capitalize font-semibold">{row.getValue("title")}</div>
		),
	},
	{
		accessorKey: "initialDeadline",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateOpportunitiesTableKeys("initialDeadline")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => <div>{formatDate(row.getValue("initialDeadline"))}</div>,
		sortingFn: "datetime",
	},
	{
		accessorKey: "finalDeadline",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateOpportunitiesTableKeys("finalDeadline")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => {
			const currentDate = new Date();
			const finalDeadline = row.getValue("finalDeadline") as string;
			const [day, month, year] = finalDeadline.split("/").map(Number);
			const parsedEndDate = new Date(year, month - 1, day);
			const isExpired = currentDate > parsedEndDate;

			return (
				<div className={`${isExpired ? "text-red-500 font-medium" : ""}`}>
					{formatDate(finalDeadline)}
				</div>
			);
		},
	},
	{
		accessorKey: "type",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateOpportunitiesTableKeys("type")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => <Tag>{row.getValue("type")}</Tag>,
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => (
			<Button
				variant="ghost"
				className="!p-0 hover:bg-transparent"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{translateOpportunitiesTableKeys("isActive")}
				{column.getIsSorted() !== "desc" && (
					<ArrowUp className="ml-2 h-4 w-4" />
				)}
				{column.getIsSorted() === "desc" && (
					<ArrowDown className="ml-2 h-4 w-4" />
				)}
			</Button>
		),
		cell: ({ row }) => (
			<Switch checked={row.getValue("isActive")} onCheckedChange={() => {}} />
		),
	},
	{
		id: "actions",
		header: "Ações",
		cell: () => {
			// const opportunity = row.original;

			return (
				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" disabled>
						<Eye className="h-4 w-4" />
						<span className="sr-only">Ver detalhes</span>
					</Button>

					<Button variant="outline" size="icon" disabled>
						<SquarePen />
						<span className="sr-only">Editar</span>
					</Button>
				</div>
			);
		},
	},
];
