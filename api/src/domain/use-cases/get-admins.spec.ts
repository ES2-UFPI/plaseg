import { describe, it, expect, beforeEach } from "vitest";

import { GetAdminsUseCase } from "./get-admins";
import { makeUser } from "../../../test/factories/make-user";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { Email } from "../entities/value-objects/email";
import { Role } from "../entities/value-objects/role";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetAdminsUseCase;

describe("Get Admins Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		sut = new GetAdminsUseCase(inMemoryUsersRepository);
	});

	it("should be able to get all admins", async () => {
		// Create admin users
		const admin1 = makeUser({
			role: Role.admin(),
			email: Email.create("admin1@example.com"),
			document: "12345678903",
		});

		const admin2 = makeUser({
			role: Role.admin(),
			email: Email.create("admin2@example.com"),
			document: "12345678902",
		});

		// Create a non-admin user
		const member = makeUser({
			role: Role.municipality(),
			email: Email.create("member@example.com"),
			document: "12345678901",
		});

		await inMemoryUsersRepository.create(admin1);
		await inMemoryUsersRepository.create(admin2);
		await inMemoryUsersRepository.create(member);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.admins).toHaveLength(2);
			expect(result.value.admins).toEqual([
				expect.objectContaining({
					email: "admin1@example.com",
				}),
				expect.objectContaining({
					email: "admin2@example.com",
				}),
			]);
		}
	});

	it("should return null when no admins are found", async () => {
		// Create only non-admin users
		const member = makeUser({
			role: Role.municipality(),
			email: Email.create("member@example.com"),
		});

		await inMemoryUsersRepository.create(member);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.admins).toBeNull();
		}
	});
});
