import { InputField } from "./input-field";

export function ProductRegistration() {
	return (
		<div className="bg-white border p-6 rounded-lg mb-6">
			<h2 className="text-xl font-semibold mb-4">Cadastro de Produtos</h2>

			<div className="grid grid-cols-4 gap-4 items-center mb-4">
				<InputField
					label="Código do Produto"
					type="text"
					placeholder="Digite o código do Produto"
				/>

				<InputField
					label="Quantidade Disponível"
					type="number"
					placeholder="Digite a quantidade Disponível"
				/>

				<InputField
					label="Valor Unitário"
					type="number"
					placeholder="Digite o valor Unitário"
				/>
			</div>

			<button className="bg-blue-500 text-white px-4 py-2 rounded-md">
				Adicionar Produto
			</button>
		</div>
	);
}
