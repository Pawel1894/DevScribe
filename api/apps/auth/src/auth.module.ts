import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SharedModule } from "@app/shared";
import { DBModule } from "@app/shared/db/db.module";

@Module({
	imports: [SharedModule, DBModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
