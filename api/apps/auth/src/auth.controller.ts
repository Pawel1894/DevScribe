import { Controller } from "@nestjs/common";
import {
	Ctx,
	MessagePattern,
	Payload,
	RmqContext,
} from "@nestjs/microservices";

import { SharedService } from "@app/shared";
import { ExistingUserDTO, NewUserDTO } from "./dtos";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly sharedService: SharedService,
	) {}

	@MessagePattern({ cmd: "register" })
	async register(@Ctx() context: RmqContext, @Payload() newUser: NewUserDTO) {
		this.sharedService.acknowledgeMessage(context);
		return this.authService.register(newUser);
	}

	@MessagePattern({ cmd: "login" })
	async login(
		@Ctx() context: RmqContext,
		@Payload() existingUser: ExistingUserDTO,
	) {
		this.sharedService.acknowledgeMessage(context);
		return this.authService.login(existingUser);
	}

	@MessagePattern({ cmd: "verify-jwt" })
	async verifyJwt(
		@Ctx() context: RmqContext,
		@Payload() payload: { jwt: string },
	) {
		this.sharedService.acknowledgeMessage(context);
		return this.authService.verifyJwt(payload.jwt);
	}

	@MessagePattern({ cmd: "decode-jwt" })
	async decodeJwt(
		@Ctx() context: RmqContext,
		@Payload() payload: { jwt: string },
	) {
		this.sharedService.acknowledgeMessage(context);
		return this.authService.getUserFromHeader(payload.jwt);
	}

	@MessagePattern({ cmd: "refresh-token" })
	async refreshToken(
		@Ctx() context: RmqContext,
		@Payload() payload: { jwt: string },
	) {
		this.sharedService.acknowledgeMessage(context);
		return this.authService.refreshToken(payload.jwt);
	}
}
