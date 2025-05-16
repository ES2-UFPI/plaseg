import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { SignUpUseCase } from "../../../../domain/use-cases/sign-up";
import { BcryptAdapter } from "../../../adapters/bcrypt-adapter";

export function makeSignUpUseCase() {
	const UsersRepository = new PrismaUsersRepository();
	const hashGenerator = new BcryptAdapter(6);

	const useCase = new SignUpUseCase(UsersRepository, hashGenerator);

	return useCase;
}
