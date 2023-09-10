import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/shared";
import { Repository } from "typeorm";

@Controller()
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	@MessagePattern({ cmd: "get-users" })
	async getUsers(@Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const msg = context.getMessage();
		channel.ack(msg);

		try {
			console.log("CREATING USER");
			const user = this.userRepository.create({
				email: "test",
				password: "test",
				firstName: "test",
				lastName: "test",
				id: 1,
			});
			this.userRepository.save(user);
		} catch (error) {
			console.log(error);
		}

		return "user create 123";
	}

	@Get()
	getHello(): string {
		return this.authService.getHello();
	}
}
