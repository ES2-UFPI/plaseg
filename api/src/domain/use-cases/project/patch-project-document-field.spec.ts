import { describe, it, expect, beforeEach } from "vitest";

import { PatchProjectDocumentFieldUseCase } from "./patch-project-document-field";
import { InMemoryFieldsRepository } from "../../../../test/repositories/in-memory-fields-repository";
import { makeField } from "../../../../test/factories/make-field";

let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: PatchProjectDocumentFieldUseCase;

describe("Patch Project Document Field Use Case", () => {
	beforeEach(() => {
		inMemoryFieldsRepository = new InMemoryFieldsRepository();
		sut = new PatchProjectDocumentFieldUseCase(inMemoryFieldsRepository);
	});

	it("should be able to patch project document field", async () => {
		const field = makeField({
			name: "Old Field",
			value: "Old Value",
		});

		await inMemoryFieldsRepository.create(field);

		const result = await sut.execute({
			fieldId: field.id.toString(),
			value: "New Value",
		});

		expect(result.isRight()).toBeTruthy();

		const updatedField = await inMemoryFieldsRepository.findById(
			field.id.toString()
		);
		expect(updatedField?.value).toBe("New Value");
	});

	it("should return error when field is not found", async () => {
		const result = await sut.execute({
			fieldId: "non-existent-id",
			value: "New Value",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toBe(404);
			expect(result.value.message).toBe("Campo não encontrado!");
		}
	});
});
