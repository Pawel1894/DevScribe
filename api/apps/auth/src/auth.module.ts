import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SharedModule, UserEntity, UsersRepository } from "@app/shared";

import { DBModule } from "@app/shared/db/db.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [SharedModule, DBModule, TypeOrmModule.forFeature([UserEntity])],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: "UsersRepositoryInterface",
			useClass: UsersRepository,
		},
	],
})
export class AuthModule {}
