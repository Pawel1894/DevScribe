import { SetMetadata } from "@nestjs/common";

export type TokenType = "token" | "refreshToken";

export const TokenType = (tokenType: TokenType) =>
	SetMetadata("tokenType", tokenType);
