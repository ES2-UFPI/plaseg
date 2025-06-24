interface InputProps {
	label: string;
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
}

export function InputField({ label, type, placeholder }: InputProps) {
	return (
		<div className="flex flex-col gap-1">
			<span>{label}</span>
			<input
				type={type}
				placeholder={placeholder}
				className="p-2 border rounded-md"
			/>
		</div>
	);
}
