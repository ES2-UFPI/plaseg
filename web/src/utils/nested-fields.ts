interface OriginalField {
	id: string;
	name: string;
	value: string;
	parentId: string | null;
}

interface Field {
	id: string;
	name: string;
	value: string | null;
	fields: Field[] | null;
	order: string;
}

export function nestFields(originalFields: OriginalField[]): Field[] {
	const fieldMap = new Map<string, Field>();

	originalFields.forEach((field) => {
		fieldMap.set(field.id, {
			id: field.id,
			name: field.name,
			value: field.value,
			fields: null,
			order: "",
		});
	});

	const rootFields: Field[] = [];

	originalFields.forEach((originalField) => {
		const currentField = fieldMap.get(originalField.id)!;

		if (originalField.parentId === null || originalField.parentId === "") {
			rootFields.push(currentField);
		} else {
			const parentField = fieldMap.get(originalField.parentId);
			if (parentField) {
				if (parentField.fields === null) {
					parentField.fields = [];
				}
				parentField.fields.push(currentField);
			} else {
				rootFields.push(currentField);
			}
		}
	});

	function assignOrder(fields: Field[], prefix: string = "") {
		fields.forEach((field, idx) => {
			const currentOrder = prefix ? `${prefix}.${idx + 1}` : `${idx + 1}`;
			field.order = currentOrder;
			if (field.fields && field.fields.length > 0) {
				assignOrder(field.fields, currentOrder);
			}
		});
	}

	assignOrder(rootFields);

	return rootFields;
}
