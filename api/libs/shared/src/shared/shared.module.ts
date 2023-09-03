import { type DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import EnvSchema from "../env/env.schema";
import { SharedService } from "./shared.service";
import EnvVariables from "../env/env.variables";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: "./.env",
			validationSchema: EnvSchema,
		}),
	],
	providers: [SharedService],
	exports: [SharedService],
})
export class SharedModule {
	static registerRmq(service: string, queue: string): DynamicModule {
		const providers = [
			{
				provide: service,
				_useFactory: (configService: ConfigService) => {
					const USER = configService.get<string>(EnvVariables.RABBITMQ_USER);
					const PASSWORD = configService.get<string>(
						EnvVariables.RABBITMQ_PASS,
					);
					const HOST = configService.get<string>(EnvVariables.RABBITMQ_HOST);

					return ClientProxyFactory.create({
						transport: Transport.RMQ,
						options: {
							urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
							queue,
							queueOptions: {
								durable: true,
							},
						},
					});
				},
				get useFactory() {
					return this._useFactory;
				},
				set useFactory(value) {
					this._useFactory = value;
				},
				inject: [ConfigService],
			},
		];

		return {
			module: SharedModule,
			providers,
			exports: providers,
		};
	}
}
