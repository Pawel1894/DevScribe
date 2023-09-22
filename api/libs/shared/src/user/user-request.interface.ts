import type { Request } from "express";

export interface UserRequest extends Request {
	user?: {
		sub: number;
		email: string;
	};
}
