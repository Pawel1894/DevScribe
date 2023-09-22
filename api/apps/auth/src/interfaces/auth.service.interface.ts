import type { UserEntity, UserJwt } from "@app/shared";
import type { ExistingUserDTO, NewUserDTO } from "../dtos";

export interface IAuthService {
	hashPassword(password: string): Promise<string>;
	doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
	validateUser(email: string, password: string): Promise<UserEntity | null>;
	findByEmail(email: string): Promise<UserEntity | null>;
	verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }>;
	getUserFromHeader(jwt: string): Promise<UserJwt | null>;
	register(newUser: Readonly<NewUserDTO>): Promise<UserEntity>;
	login(
		existingUser: Readonly<ExistingUserDTO>,
	): Promise<{ token: string; refreshToken: string; user: UserEntity }>;
	refreshToken(
		user: UserJwt["user"],
	): Promise<{ token: string; refreshToken: string }>;
	getTokens(
		user: UserJwt["user"],
	): Promise<{ token: string; refreshToken: string }>;
}
