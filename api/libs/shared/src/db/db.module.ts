import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import EnvVariables from "../env/env.variables";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				database: configService.get<string>(EnvVariables.POSTGRES_DB),
				password: configService.get<string>(EnvVariables.POSTGRES_PASSWORD),
				port: configService.get<number>(EnvVariables.POSTGRES_PORT),
				username: configService.get<string>(EnvVariables.POSTGRES_USER),
				host: configService.get<string>(EnvVariables.POSTGRES_HOST),
				synchronize: true, // shouldn't be used in production - may lose data CHANGE
				autoLoadEntities: true,
			}),

			inject: [ConfigService],
		}),
		// Do i need to add for feature?
	],
})
export class DBModule {}
