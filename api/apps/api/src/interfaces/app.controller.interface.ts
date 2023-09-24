import type { UserEntity } from "@app/shared";

export interface Tokens {
	token: string;
	refreshToken: string;
}

export interface ILogin extends Tokens {
	user: UserEntity;
}
