import { Observable } from "rxjs";
import {
	Body,
	Controller,
	Get,
	Inject,
	Post,
	UseGuards,
	UseInterceptors,
	Req,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "./guards/auth.guard";
import { TokenType } from "./decorators/token-type.decorator";
import { AttachUserInterceptor } from "./interceptors/attach-user.interceptor";
import { type UserEntity, type UserJwt, Services } from "@app/shared";
import type { ILogin, Tokens } from "./interfaces/app.controller.interface";

@UseInterceptors(AttachUserInterceptor)
@Controller()
export class AppController {
	constructor(
		@Inject(Services.AuthService) private readonly authService: ClientProxy,
	) {}

	@Post("auth/register")
	register(
		@Body("firstName") firstName: string,
		@Body("lastName") lastName: string,
		@Body("email") email: string,
		@Body("password") password: string,
	): Observable<UserEntity> {
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
	login(
		@Body("email") email: string,
		@Body("password") password: string,
	): Observable<ILogin> {
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
	refresh(@Req() req: UserJwt): Observable<Tokens> {
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
	test(): string {
		return "Auth works!";
	}
}
