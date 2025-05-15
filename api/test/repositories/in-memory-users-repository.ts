import { UsersRepository } from "../../src/domain/repositories/users-repository";
import { User } from "../../src/domain/entities/user";
import { DomainRole, Role } from "../../src/domain/entities/value-objects/role";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	async findById(id: string): Promise<User | null> {
		const user = this.items.find((user) => user.id.toString() === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find((user) => user.email.toString() === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByDocument(document: string): Promise<User | null> {
		const user = this.items.find((user) => user.document === document);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(user: User): Promise<void> {
		this.items.push(user);
	}

	async findManyAdmins(): Promise<User[]> {
		return this.items.filter(
			(user) => user.role.toString() === Role.admin().toString()
		);
	}
}
