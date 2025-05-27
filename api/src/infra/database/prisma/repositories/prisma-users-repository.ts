import { UsersRepository } from "../../../../domain/repositories/users-repository";
import { prisma } from "../prisma";
import { User } from "../../../../domain/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUsersRepository implements UsersRepository {
	async findManyAdmins(): Promise<User[]> {
		const admins = await prisma.user.findMany({
			where: {
				role: "ADMIN",
			},
		});

		return admins.map(PrismaUserMapper.toDomain);
	}
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByDocument(document: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				document,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async create(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user);

		await prisma.user.create({
			data,
		});
	}
}
