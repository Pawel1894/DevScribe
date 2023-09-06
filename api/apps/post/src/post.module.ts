import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { DBModule } from "@app/shared/db/db.module";

@Module({
	imports: [],
	controllers: [PostController, DBModule],
	providers: [PostService],
})
export class PostModule {}
