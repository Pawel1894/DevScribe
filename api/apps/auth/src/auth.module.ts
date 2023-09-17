import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import {
	SharedModule,
	UserEntity,
	UsersRepository,
	DBModule,
} from "@app/shared";
import EnvVariables from "@app/shared/env/env.variables";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		SharedModule,
		DBModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get(EnvVariables.JWT_SECRET),
				signOptions: { expiresIn: EnvVariables.JWT_EXPIRATION_TIME },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UsersRepository],
})
export class AuthModule {}
