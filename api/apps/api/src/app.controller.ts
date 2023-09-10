import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class AppController {
	constructor(
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
	) {}

	@Get("users")
	async getUsers() {
		return this.authService.send(
			{
				cmd: "get-users",
			},
			{},
		);
	}

	@Get("test")
	test() {
		return "test";
	}
}
