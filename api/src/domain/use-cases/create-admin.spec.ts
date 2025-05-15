import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { FakeHasher } from "../../../test/cryptography/fake-hasher";
import { CreateAdminUseCase } from "./create-admin";
import { makeUser } from "../../../test/factories/make-user";
import { Email } from "../entities/value-objects/email";
import { CustomError } from "../../core/errors/custom-error";
import { Role } from "../entities/value-objects/role";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: CreateAdminUseCase;

describe("Create Admin Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeHasher = new FakeHasher();
		sut = new CreateAdminUseCase(inMemoryUsersRepository, fakeHasher);
	});

	it("should be able to create a new admin user", async () => {
		const adminMaster = makeUser({
			role: Role.adminMaster(),
			email: Email.create("adminmaster@admin.com"),
			document: "12345678900",
		});

		await inMemoryUsersRepository.create(adminMaster);

		const admin = makeUser();
		const result = await sut.execute({
			name: admin.name,
			email: admin.email.toString(),
			phone: admin.phone,
			document: admin.document,
			password: admin.password,
			requesterId: adminMaster.id.toString(),
		});
		

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryUsersRepository.items).toHaveLength(2);
		if (result.isRight()) {
			expect(result.value.admin.role).toEqual(Role.admin());
			expect(inMemoryUsersRepository.items[1]).toEqual(result.value.admin);
		}
	});

	it("should not be able to create admin if requester does not exist", async () => {
		const admin = makeUser({
			email: Email.create("admin1@admin.com"),
			document: "12345678901",
		});
		const result = await sut.execute({
			name: admin.name,
			email: admin.email.toString(),
			phone: admin.phone,
			document: admin.document,
			password: admin.password,
			requesterId: "non-existent-id",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("Usuário adm master não encontrado");
		}
		expect(inMemoryUsersRepository.items).toHaveLength(0);
	});

	it("should not be able to create admin if requester is not an admin master", async () => {
		const regularAdmin = makeUser({
			role: Role.admin(),
		});

		await inMemoryUsersRepository.create(regularAdmin);

		const admin = makeUser();
		const result = await sut.execute({
			name: admin.name,
			email: admin.email.toString(),
			phone: admin.phone,
			document: admin.document,
			password: admin.password,
			requesterId: regularAdmin.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(403);
			expect(result.value.message).toEqual("Acesso negado");
		}
		expect(inMemoryUsersRepository.items).toHaveLength(1);
	});

	it("should not be able to create admin with existing email", async () => {
		const adminMaster = makeUser({
			role: Role.adminMaster(),
		});

		const existingUser = makeUser({
			email: Email.create("john@doe.com"),
		});

		await inMemoryUsersRepository.create(adminMaster);
		await inMemoryUsersRepository.create(existingUser);

		const admin = makeUser({
			email: Email.create("john@doe.com"),
		});

		const result = await sut.execute({
			name: admin.name,
			email: admin.email.toString(),
			phone: admin.phone,
			document: admin.document,
			password: admin.password,
			requesterId: adminMaster.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Email já cadastrado");
		}
		expect(inMemoryUsersRepository.items).toHaveLength(2);
	});

	it("should not be able to create admin with existing document", async () => {
		const adminMaster = makeUser({
			role: Role.adminMaster(),
		});

		const existingUser = makeUser({
			email: Email.create("existing@email.com"),
			document: "12345678900",
		});

		await inMemoryUsersRepository.create(adminMaster);
		await inMemoryUsersRepository.create(existingUser);

		const admin = makeUser({
			email: Email.create("new@email.com"),
			document: "12345678900",
		});

		const result = await sut.execute({
			name: admin.name,
			email: admin.email.toString(),
			phone: admin.phone,
			document: admin.document,
			password: admin.password,
			requesterId: adminMaster.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toEqual(
				new CustomError(409, ["Documento já cadastrado"])
			);
		}
		expect(inMemoryUsersRepository.items).toHaveLength(2);
	});
});
