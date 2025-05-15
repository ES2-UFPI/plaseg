import { CustomError } from "../../core/errors/custom-error";
import { Either, right } from "../../core/types/either";
import { UsersRepository } from "../repositories/users-repository";

type AdminResponse = {
	id: string;
	name: string;
	email: string;
	phone: string;
	document: string;
	role: string;
	createdAt: Date;
	updatedAt: Date | null;
};

type GetAdminsUseCaseResponse = Either<
	CustomError,
	{
		admins: AdminResponse[] | null;
	}
>;

export class GetAdminsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(): Promise<GetAdminsUseCaseResponse> {
		const admins = await this.usersRepository.findManyAdmins();

		if (!admins.length) {
			return right({
				admins: null,
			});
		}

		const adminsResponse = admins.map((admin) => {
			return {
				id: admin.id.toString(),
				name: admin.name,
				email: admin.email.toString(),
				phone: admin.phone,
				document: admin.document,
				role: admin.role.toString(),
				createdAt: admin.createdAt,
				updatedAt: admin.updatedAt ?? null,
			};
		});

		return right({ admins: adminsResponse });
	}
}
