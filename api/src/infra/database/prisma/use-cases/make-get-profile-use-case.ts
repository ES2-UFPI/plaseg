import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { GetProfileUseCase } from "../../../../domain/use-cases/auth/get-profile";

export function makeGetProfileUseCase() {
	const UsersRepository = new PrismaUsersRepository();

	const useCase = new GetProfileUseCase(UsersRepository);

	return useCase;
}
