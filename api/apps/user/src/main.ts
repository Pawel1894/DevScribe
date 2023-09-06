import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { SharedService } from "@app/shared";
import EnvVariables from "@app/shared/env/env.variables";
import { UserModule } from "./user.module";

async function bootstrap() {
	const app = await NestFactory.create(UserModule);

	const configService = app.get(ConfigService);
	const sharedService = app.get(SharedService);

	const queue = configService.get(EnvVariables.RABBITMQ_USER_QUEUE);

	app.connectMicroservice(sharedService.getRmqOptions(queue));
	app.startAllMicroservices();
}
bootstrap();
