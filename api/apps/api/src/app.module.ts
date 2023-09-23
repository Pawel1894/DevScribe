import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { Services, SharedModule } from "@app/shared";
import EnvVariables from "@app/shared/env/env.variables";

@Module({
	imports: [
		SharedModule.registerRmq(
			Services.AuthService,
			process.env[EnvVariables.RABBITMQ_AUTH_QUEUE]!,
		),
		SharedModule.registerRmq(
			Services.PostService,
			process.env[EnvVariables.RABBITMQ_POST_QUEUE]!,
		),
		SharedModule.registerRmq(
			Services.UserService,
			process.env[EnvVariables.RABBITMQ_USER_QUEUE]!,
		),
	],
	controllers: [AppController],
})
export class AppModule {}
