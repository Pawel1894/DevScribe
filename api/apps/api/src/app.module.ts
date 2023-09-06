import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { SharedModule } from "@app/shared";
import EnvVariables from "@app/shared/env/env.variables";

@Module({
	imports: [
		SharedModule.registerRmq(
			"AUTH_SERVICE",
			process.env[EnvVariables.RABBITMQ_AUTH_QUEUE]!,
		),
		SharedModule.registerRmq(
			"POST_SERVICE",
			process.env[EnvVariables.RABBITMQ_POST_QUEUE]!,
		),
		SharedModule.registerRmq(
			"USER_SERVICE",
			process.env[EnvVariables.RABBITMQ_USER_QUEUE]!,
		),
	],
	controllers: [AppController],
})
export class AppModule {}
