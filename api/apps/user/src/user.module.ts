import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DBModule } from "@app/shared/db/db.module";

@Module({
	imports: [],
	controllers: [UserController, DBModule],
	providers: [UserService],
})
export class UserModule {}
