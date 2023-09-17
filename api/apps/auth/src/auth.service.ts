import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { type UserEntity, type UserJwt, UsersRepository } from "@app/shared";
import type { ExistingUserDTO, NewUserDTO } from "./dtos";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly jwtService: JwtService,
	) {}

	async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 12);
	}

	async doesPasswordMatch(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<UserEntity | null> {
		const user = await this.findByEmail(email);

		const doesUserExist = !!user;

		if (!doesUserExist) return null;

		const doesPasswordMatch = await this.doesPasswordMatch(
			password,
			user.password,
		);

		if (!doesPasswordMatch) return null;

		return user;
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		return this.usersRepository.findByCondition({
			where: { email },
			select: ["id", "firstName", "lastName", "email", "password"],
		});
	}

	async verifyJwt(jwt: string): Promise<{ user: UserEntity; exp: number }> {
		if (!jwt) {
			throw new UnauthorizedException();
		}

		try {
			const { user, exp } = await this.jwtService.verifyAsync(jwt);
			return { user, exp };
		} catch (error) {
			throw new UnauthorizedException();
		}
	}

	async getUserFromHeader(jwt: string): Promise<UserJwt | null> {
		if (!jwt) return null;

		try {
			return this.jwtService.decode(jwt) as UserJwt;
		} catch (error) {
			throw new BadRequestException();
		}
	}

	async register(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
		const { firstName, lastName, email, password } = newUser;

		const existingUser = await this.findByEmail(email);

		if (existingUser) {
			throw new ConflictException("An account with that email already exists!");
		}

		const hashedPassword = await this.hashPassword(password);

		const savedUser = await this.usersRepository.save({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		// delete savedUser.password;
		return savedUser;
	}

	async login(existingUser: Readonly<ExistingUserDTO>) {
		const { email, password } = existingUser;
		const user = await this.validateUser(email, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		// delete user.password;

		const jwt = await this.jwtService.signAsync({ user });

		return { token: jwt, user };
	}
}
