import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { Either, left, right } from "../../core/types/either";
import { CustomError } from "../../core/errors/custom-error";
import { HashGenerator } from "../cryptography/hash-generator";
import { Email } from "../entities/value-objects/email";

type SignUpUseCaseRequest = {
	name: string;
	email: string;
	phone: string;
	document: string;
	password: string;
};

type SignUpUseCaseResponse = Either<
	CustomError,
	{
		user: User;
	}
>;

export class SignUpUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute(request: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
		const doesEmailAlreadyExist = await this.usersRepository.findByEmail(
			request.email
		);

		if (doesEmailAlreadyExist) {
			return left(new CustomError(409, "Email já cadastrado"));
		}

		const doesDocumentAlreayExist = await this.usersRepository.findByDocument(
			request.document
		);

		if (doesDocumentAlreayExist) {
			return left(new CustomError(409, "Documento já cadastrado"));
		}

		const hashedPassword = await this.hashGenerator.hash(request.password);

		const user = User.create({
			...request,
			email: Email.create(request.email),
			password: hashedPassword,
		});

		await this.usersRepository.create(user);

		return right({
			user,
		});
	}
}
