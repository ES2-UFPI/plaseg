import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { UsersRepository } from "../../repositories/users-repository";

type GetProfileUseCaseRequest = {
	userId: string;
};

type GetProfileUseCaseResponse = Either<
	CustomError,
	{
		user: {
			id: string;
			name: string;
			email: string;
			role: string;
		};
	}
>;

export class GetProfileUseCase {
	constructor(private UsersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
		const user = await this.UsersRepository.findById(userId);

		if (!user) {
			return left(new CustomError(404, "Usuário não encontrado"));
		}

		return right({
			user: {
				name: user.name,
				id: user.id.toString(),
				email: user.email.toString(),
				role: user.role.toString(),
			},
		});
	}
}
