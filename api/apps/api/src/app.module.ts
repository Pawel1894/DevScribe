import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { SharedModule } from "@app/shared";

// TODO: Where should i put this type declaration?
// should i put it in api/libs/shared/src/shared/shared.service.ts?
// should i create a new file for declaration types?
// https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgLzgXzgMyhEcBEyEAJvgNwBQFA9NVgIYDWApnKJLHDBHAObPwAAjACeYZgGdqAOxKtg0rgAtWYADb0RvHAFdpxCu2jwEGbLjgByTBMtUAxhGkT4zaQDcAavSjB6AIzVJOABeFAA6CH8AK2Z7GAAKBAo4OAARAEEAFQyAIQyAZQBRAH0AVQAlABkALgiXX2leBIBKABoUuABhMoKsgHkAWRK+soAxMbrkcIaFZvaKNBbKCjcvHz9AyXCwHwlmBLAce0kJcLXlqmI4jShWXjUo+jVETul6EEldk7gAOTkAFIFV6pVIKGDMKCYeg-AAKx1ORQ8nVBcGYAA8IfoJBEFJhIQAeUTiCCYNEeby+AJBCQAPkQaE6jMZNDo13st3uj38z1etFB70+Em+rH+1yBfLoqPBkOhcIREgkSPcrNRoIxWOIOOmeMJxOYpPJ6ypWzpDNVqUZ-JZRwgJ0V5w84UyOXyxXK1Uo-LVqIAegB+ChAA
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			RABBITMQ_AUTH_QUEUE: string;
		}
	}
}

@Module({
	imports: [
		SharedModule.registerRmq("AUTH_SERVICE", process.env.RABBITMQ_AUTH_QUEUE!),
	],
	controllers: [AppController],
})
export class AppModule {}
