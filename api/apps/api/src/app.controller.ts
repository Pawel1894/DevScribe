import {
	Body,
	Controller,
	Get,
	Inject,
	Post,
	UseGuards,
	Headers,
	UseInterceptors,
	Req,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "./guards/auth.guard";
import { TokenType } from "./decorators/token-type.decorator";
import { AttachUserInterceptor } from "./interceptors/attach-user.interceptor";
import { type UserJwt } from "@app/shared";

@UseInterceptors(AttachUserInterceptor)
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

	@TokenType("refreshToken")
	@UseGuards(AuthGuard)
	@Get("auth/refresh")
	refresh(@Req() req: UserJwt) {
		const user = req["user"];
		return this.authService.send(
			{ cmd: "refresh-token" },
			{
				user,
			},
		);
	}

	@UseGuards(AuthGuard)
	@Get("test")
	test() {
		return "Auth works!";
	}
}
