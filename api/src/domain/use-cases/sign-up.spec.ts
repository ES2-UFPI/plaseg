import { describe, it, expect, beforeEach } from "vitest";
import { FakeHasher } from "../../../test/cryptography/fake-hasher";
import { SignUpUseCase } from "./sign-up";
import { Email } from "../entities/value-objects/email";
import { CustomError } from "../../core/errors/custom-error";
import { makeUser } from "../../../test/factories/make-user";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: SignUpUseCase;

describe("Sign Up Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeHasher = new FakeHasher();
		sut = new SignUpUseCase(inMemoryUsersRepository, fakeHasher);
	});

	it("should be able to sign up a new user", async () => {
		const user = makeUser();
		const result = await sut.execute({
			name: user.name,
			email: user.email.toString(),
			phone: user.phone,
			document: user.document,
			password: user.password,
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryUsersRepository.items).toHaveLength(1);
		if (result.isRight()) {
			expect(inMemoryUsersRepository.items[0]).toEqual(result.value.user);
		}
	});

	it("should not be able to sign up with existing email", async () => {
		const existingUser = makeUser({
			email: Email.create("john@doe.com"),
		});
		const newUser = makeUser({
			email: Email.create("john@doe.com"),
		});

		await inMemoryUsersRepository.create(existingUser);

		const result = await sut.execute({
			name: newUser.name,
			email: newUser.email.toString(),
			phone: newUser.phone,
			document: newUser.document,
			password: newUser.password,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Email já cadastrado");
		}
		expect(inMemoryUsersRepository.items).toHaveLength(1);
	});

	it("should not be able to sign up with existing document", async () => {
		const existingUser = makeUser({
			email: Email.create("john@doe.com"),
			document: "12345678900",
		});
		const newUser = makeUser({
			email: Email.create("test@email.com"),
			document: "12345678900",
		});

		await inMemoryUsersRepository.create(existingUser);

		const result = await sut.execute({
			name: newUser.name,
			email: newUser.email.toString(),
			phone: newUser.phone,
			document: newUser.document,
			password: newUser.password,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toEqual(
				new CustomError(409, ["Documento já cadastrado"])
			);
		}
		expect(inMemoryUsersRepository.items).toHaveLength(1);
	});
});
