import { User } from "../entities/user";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByDocument(document: string): Promise<User | null>;
	create(user: User): Promise<void>;
	findManyAdmins(): Promise<User[]>;
}
