import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { CreateAdminUseCase } from "../../../../domain/use-cases/create-admin";
import { BcryptAdapter } from "../../../adapters/bcrypt-adapter";

export function makeCreateAdminUseCase() {
	const UsersRepository = new PrismaUsersRepository();
	const hashGenerator = new BcryptAdapter(6);

	const useCase = new CreateAdminUseCase(UsersRepository, hashGenerator);

	return useCase;
}
