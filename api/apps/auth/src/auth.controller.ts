import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern({ cmd: "get-users" })
	async getUsers(@Ctx() context: RmqContext) {
		return this.authService.createUser();
	}

	@Get()
	getHello(): string {
		return this.authService.getHello();
	}
}
