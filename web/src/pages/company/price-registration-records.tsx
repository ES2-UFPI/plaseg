import { PriceRegistrationRecordsTable } from "@/components/company/price-registration-record/price-registration-records-table";

export default function PriceRegistrationRecords() {
	return (
		<div className="py-4">
			<div className="w-full">
				<h1 className="text-2xl font-semibold">Atas de Registro de Preço</h1>
				<span className="text-muted-foreground text-sm">
					Vejas as informações sobre as atas de registro de preço cadastradas.
				</span>
			</div>

			<PriceRegistrationRecordsTable />
		</div>
	);
}
