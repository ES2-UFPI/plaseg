import { CreateMunicipalityForm } from "@/components/municipality/create-municipality-form";

export default function RegisterMunicipality() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col gap-4 max-w-[500px] w-full">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Cadastro de Município</h1>
					<p className="text-sm text-muted-foreground">
						Informe os dados do município para cadastro.
					</p>
				</div>

				<div className="bg-white rounded-lg p-6 border">
					<CreateMunicipalityForm />
				</div>
			</div>
		</div>
	);
}
