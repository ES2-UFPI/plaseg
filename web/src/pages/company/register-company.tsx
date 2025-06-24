import { RegisterCompanyForm } from "@/components/company/register-company/register-company-form";
import { Laptop } from "lucide-react";

export default function RegisterCompany() {
	return (
		<div className="w-full h-screen grid grid-cols-3">
			<div className="flex flex-col  items-center justify-center bg-muted/30">
				<div className="flex flex-col items-start">
					<h1 className="text-4xl font-semibold flex items-center gap-4">
						<Laptop size={40} /> Plaseg
					</h1>
					<span className="text-muted-foreground/70 font-medium">
						Cadastro de Empresa
					</span>
				</div>
			</div>

			<div className="col-span-2">
				<RegisterCompanyForm />
			</div>
		</div>
	);
}
