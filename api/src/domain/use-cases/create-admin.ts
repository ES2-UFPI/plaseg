import { UsersRepository } from "../repositories/users-repository";
import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { User } from "../entities/user";
import { HashGenerator } from "../cryptography/hash-generator";
import { DomainRole, Role } from "../entities/value-objects/role";
import { Email } from "../entities/value-objects/email";

type CreateAdminUseCaseRequest = {
	name: string;
	email: string;
	phone: string;
	document: string;
	password: string;

	requesterId: string;
};

type CreateAdminUseCaseResponse = Either<
	CustomError,
	{
		admin: User;
	}
>;

export class CreateAdminUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute(
		request: CreateAdminUseCaseRequest
	): Promise<CreateAdminUseCaseResponse> {
		const requester = await this.usersRepository.findById(request.requesterId);

		if (!requester) {
			return left(new CustomError(404, "Usuário adm master não encontrado"));
		}

		if (requester.role.getValue() !== DomainRole.ADMIN_MASTER) {
			return left(new CustomError(403, "Acesso negado"));
		}

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
			return left(new CustomError(409, ["Documento já cadastrado"]));
		}

		const hashedPassword = await this.hashGenerator.hash(request.password);

		const admin = User.create({
			name: request.name,
			email: Email.create(request.email),
			phone: request.phone,
			document: request.document,
			password: hashedPassword,
			role: Role.admin(),
		});

		await this.usersRepository.create(admin);

		return right({
			admin,
		});
	}
}
