import { UserJwt } from "@app/shared";
import {
	type CallHandler,
	type ExecutionContext,
	type NestInterceptor,
	Injectable,
	Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { subscribe } from "diagnostics_channel";
import { type Request } from "express";
import { map, switchMap, type Observable, firstValueFrom } from "rxjs";

@Injectable()
export class AttachUserInterceptor implements NestInterceptor {
	constructor(
		@Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest<UserJwt>();
		const jwt = request.headers.authorization?.split(" ")[1];
		if (jwt) {
			const response = await this.authService.send(
				{ cmd: "decode-jwt" },
				{ jwt },
			);

			const user: UserJwt["user"] = await firstValueFrom(response);

			request.user = user;
		}
		return next.handle();
	}
}
