import { ProductsTable } from "@/components/company/products/products-table";

export default function Products() {
	return (
		<div className="py-4">
			<div className="w-full">
				<h1 className="text-2xl font-semibold">Produtos</h1>
				<span className="text-muted-foreground text-sm">
					Vejas as informações sobre os seus produtos cadastrados.
				</span>
			</div>

			<ProductsTable />
		</div>
	);
}
