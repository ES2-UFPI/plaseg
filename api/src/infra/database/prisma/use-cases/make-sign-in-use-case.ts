import { FastifyReply } from "fastify";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { SignInUseCase } from "../../../../domain/use-cases/sign-in";
import { JwtEncrypter } from "../../../adapters/jwt-encrypter.adapter";
import { BcryptAdapter } from "../../../adapters/bcrypt-adapter";

export function makeSignInUseCase(reply: FastifyReply) {
	const UsersRepository = new PrismaUsersRepository();
	const encrypter = new JwtEncrypter(reply);
	const hashComparer = new BcryptAdapter(6);
	const useCase = new SignInUseCase(UsersRepository, hashComparer, encrypter);

	return useCase;
}
