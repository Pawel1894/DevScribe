import { UserRepositoryInterface } from "@app/shared";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
	constructor(
		@Inject("UsersRepositoryInterface")
		private readonly usersRepository: UserRepositoryInterface,
	) {}

	getHello(): string {
		return "Hello World!";
	}

	async createUser() {
		return "blabla";
	}
}
