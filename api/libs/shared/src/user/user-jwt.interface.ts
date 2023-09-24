import type { UserRequest } from "./user-request.interface";

export interface UserJwt extends UserRequest {
	iat: number;
	exp: number;
}
