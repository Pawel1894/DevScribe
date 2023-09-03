import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SharedModule } from "@app/shared";

@Module({
	imports: [SharedModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
