import { Module } from "@nestjs/common";
import { SharedModule, DBModule } from "@app/shared";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
	imports: [SharedModule, DBModule],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
