import { extractBearerTokenFromAuthHeader } from "@app/shared";
import {
	type CanActivate,
	type ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { type Observable, catchError, of, switchMap } from "rxjs";
import type { TokenType } from "../decorators/token-type.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
		private reflector: Reflector,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const tokenType =
			this.reflector.get<TokenType>("tokenType", context.getHandler()) ??
			"token";

		if (context.getType() !== "http") {
			return false;
		}

		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers["authorization"];

		if (!authHeader || typeof authHeader !== "string") return false;

		const jwt = extractBearerTokenFromAuthHeader(authHeader);
		if (!jwt) return false;

		return this.authService.send({ cmd: "verify-jwt" }, { jwt }).pipe(
			switchMap(({ exp }) => {
				if (!exp) return of(false);

				const TOKEN_EXP_MS = exp * 1000;

				const isJwtValid = Date.now() < TOKEN_EXP_MS;

				return of(isJwtValid);
			}),
			catchError(() => {
				throw new UnauthorizedException(`invalid ${tokenType}`);
			}),
		);
	}
}
