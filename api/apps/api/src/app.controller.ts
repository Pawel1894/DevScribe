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

/**
 * This is the main controller for the app.
 */
@UseInterceptors(AttachUserInterceptor)
@Controller()
export class AppController {
	constructor(
		@Inject(Services.AuthService) private readonly authService: ClientProxy,
	) {}

	/**
	 * This route is used to register a new user.
	 */
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

	/**
	 * This route is used to login a user.
	 */
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

	/**
	 * This route is used to get new jwt and refresh tokens.
	 */
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

	/**
	 * This is a test route to ensure that the auth guard is working.
	 */
	@UseGuards(AuthGuard)
	@Get("test")
	test(): string {
		return "Auth works!";
	}
}
