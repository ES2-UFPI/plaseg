import { GetAdminsUseCase } from "../../../../domain/use-cases/get-admins";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";

export function makeGetAdminsUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const useCase = new GetAdminsUseCase(usersRepository);

	return useCase;
}
