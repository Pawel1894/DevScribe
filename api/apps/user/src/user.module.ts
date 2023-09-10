import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SharedModule, DBModule } from "@app/shared";

@Module({
	imports: [SharedModule, DBModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
