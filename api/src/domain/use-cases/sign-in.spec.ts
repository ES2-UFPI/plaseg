import { describe, it, expect, beforeEach } from "vitest";
import { SignInUseCase } from "./sign-in";
import { FakeEncrypter } from "../../../test/cryptography/fake-encrypter";
import { FakeHasher } from "../../../test/cryptography/fake-hasher";
import { Email } from "../entities/value-objects/email";
import { InMemoryUsersRepository } from "../../../test/repositories/in-memory-users-repository";
import { makeUser } from "../../../test/factories/make-user";
let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let sut: SignInUseCase;

describe("Sign In Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeEncrypter = new FakeEncrypter();
		fakeHasher = new FakeHasher();
		sut = new SignInUseCase(inMemoryUsersRepository, fakeHasher, fakeEncrypter);
	});

	it("should be able to authenticate with valid credentials", async () => {
		const user = makeUser({
			email: Email.create("john@doe.com"),
			password: "12345678-hashed",
		});

		await inMemoryUsersRepository.create(user);

		const result = await sut.execute({
			email: "john@doe.com",
			password: "12345678",
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value).toEqual({
				accessToken: expect.any(String),
			});
		}
	});

	it("should not be able to authenticate with wrong email", async () => {
		const result = await sut.execute({
			email: "invalid@email.com",
			password: "12345678",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Credenciais inválidas");
		}
	});

	it("should not be able to authenticate with wrong password", async () => {
		const user = makeUser({
			email: Email.create("john@doe.com"),
			password: "12345678-hashed",
		});

		await inMemoryUsersRepository.create(user);

		const result = await sut.execute({
			email: "john@doe.com",
			password: "00000000",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(400);
			expect(result.value.message).toEqual("Credenciais inválidas");
		}
	});
});
