import type { UserEntity } from "@app/shared/entities/user.entity";
import type { BaseInterfaceRepository } from "../base/base.interface.repository";

export interface UserRepositoryInterface
	extends BaseInterfaceRepository<UserEntity> {}
