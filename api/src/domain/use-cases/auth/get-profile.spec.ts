import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { GetProfileUseCase } from "./get-profile";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase;

describe("Get Profile Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		sut = new GetProfileUseCase(inMemoryUsersRepository);
	});

	it("should be able to get a user profile", async () => {
		const user = makeUser();

		await inMemoryUsersRepository.create(user);

		const result = await sut.execute({
			userId: user.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(inMemoryUsersRepository.items[0].id.toString()).toEqual(
				result.value.user.id
			);
			expect(inMemoryUsersRepository.items[0].name).toEqual(
				result.value.user.name
			);
			expect(inMemoryUsersRepository.items[0].email.toString()).toEqual(
				result.value.user.email
			);
			expect(inMemoryUsersRepository.items[0].role.toString()).toEqual(
				result.value.user.role
			);
		}
	});

	it("should not be able to get a profile of a non-existing user", async () => {
		const result = await sut.execute({
			userId: "6d3bc502-7e7d-40b5-a6c6-e58e9fc7924c",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("Usuário não encontrado");
		}
	});
});
