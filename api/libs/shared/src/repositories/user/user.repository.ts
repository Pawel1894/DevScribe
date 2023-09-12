import { UserEntity } from "@app/shared/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "../base/base.abstract.repository";
import type { UserRepositoryInterface } from "./users.repository.interface";

@Injectable()
export class UsersRepository
	extends BaseAbstractRepository<UserEntity>
	implements UserRepositoryInterface
{
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
	) {
		super(UserRepository);
	}
}
