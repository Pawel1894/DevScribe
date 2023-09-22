import {
	Body,
	Controller,
	Get,
	Inject,
	Post,
	UseGuards,
	Headers,
	BadRequestException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "./guards/auth.guard";
import { TokenType } from "./decorators/token-type.decorator";

@Controller()
export class AppController {
	constructor(
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
	) {}

	@Post("auth/register")
	async register(
		@Body("firstName") firstName: string,
		@Body("lastName") lastName: string,
		@Body("email") email: string,
		@Body("password") password: string,
	) {
		return this.authService.send(
			{
				cmd: "register",
			},
			{
				firstName,
				lastName,
				email,
				password,
			},
		);
	}

	@Post("auth/login")
	async login(
		@Body("email") email: string,
		@Body("password") password: string,
	) {
		return this.authService.send(
			{
				cmd: "login",
			},
			{
				email,
				password,
			},
		);
	}

	@TokenType("token")
	@UseGuards(AuthGuard)
	@Get("auth/refresh")
	refresh(@Headers("authorization") authHeader: string) {
		if (!authHeader) throw new BadRequestException("No auth header provided");

		return this.authService.send({ cmd: "refresh" }, { authHeader });
	}

	@TokenType("token")
	@UseGuards(AuthGuard)
	@Get("test")
	test() {
		return "Auth works!";
	}
}
