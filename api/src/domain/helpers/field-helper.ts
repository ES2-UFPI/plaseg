import { Either, left, right } from "../../core/types/either";
import { CustomError } from "../../core/errors/custom-error";
import { Field } from "../entities/field";
import { PrismaFieldMapper } from "../../infra/database/prisma/mappers/prisma-field-mapper";
import { Prisma } from "@prisma/client";

export type FlatField = {
	id: string;
	name: string;
	value?: string;
	parentId?: string;
};

export function validateFlatFields(
	fields: FlatField[]
): Either<CustomError, null> {
	const ids = new Set<string>();

	for (const field of fields) {
		if (!field.id || !field.name) {
			return left(
				new CustomError(
					409,
					"Você está tentando cadastrar campos sem id ou nome."
				)
			);
		}
		if (ids.has(field.id)) {
			return left(
				new CustomError(
					409,
					"Você está tentando cadastrar campos com o mesmo id."
				)
			);
		}
		ids.add(field.id);
	}

	return right(null);
}

export function buildFieldTree(fields: FlatField[]): Field[] {
	type FieldNode = {
		field: Field;
		children: FieldNode[];
	};

	const fieldMap = new Map<string, FieldNode>();

	for (const field of fields) {
		fieldMap.set(field.id, {
			field: Field.create({
				name: field.name,
				value: field.value,
				fields: [],
			}),
			children: [],
		});
	}

	const roots: FieldNode[] = [];

	for (const field of fields) {
		const current = fieldMap.get(field.id)!;
		if (field.parentId) {
			const parent = fieldMap.get(field.parentId);
			if (parent) {
				parent.children.push(current);
			}
		} else {
			roots.push(current);
		}
	}

	function assignChildren(node: FieldNode): Field {
		return Field.create(
			{
				name: node.field.name,
				value: node.field.value,
				fields: node.children.map(assignChildren),
			},
			node.field.id
		);
	}

	return roots.map(assignChildren);
}

export async function createFieldsRecursively(
	fields: Field[],
	documentId: string,
	tx: Prisma.TransactionClient,
	parentId: string | null = null
) {
	for (const field of fields) {
		const data = PrismaFieldMapper.toPrisma(field, parentId, documentId);
		const created = await tx.field.create({
			data,
		});

		if (field.fields && field.fields.length > 0) {
			await createFieldsRecursively(field.fields, documentId, tx, created.id);
		}
	}
}
