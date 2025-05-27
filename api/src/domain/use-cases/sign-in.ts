import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encypter";
import { UsersRepository } from "../repositories/users-repository";

type SignInUseCaseRequest = {
	email: string;
	password: string;
};

type SignInUseCaseResponse = Either<
	CustomError,
	{
		accessToken: string;
	}
>;

export class SignInUseCase {
	constructor(
		private UsersRepository: UsersRepository,
		private hashComparer: HashComparer,
		private encrypter: Encrypter
	) {}

	async execute({
		email,
		password,
	}: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
		const user = await this.UsersRepository.findByEmail(email);

		if (!user) {
			return left(new CustomError(400, "Credenciais inválidas"));
		}

		const isPasswordValid = await this.hashComparer.compare(
			password,
			user.password
		);

		if (!isPasswordValid) {
			return left(new CustomError(400, "Credenciais inválidas"));
		}

		const accessToken = await this.encrypter.encrypt({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		return right({
			accessToken,
		});
	}
}
