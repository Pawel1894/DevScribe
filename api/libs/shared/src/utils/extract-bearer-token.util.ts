export function extractBearerTokenFromAuthHeader(authHeader: string | null) {
	if (!authHeader || typeof authHeader !== "string") return null;

	const authHeaderParts = authHeader.split(" ");
	if (authHeaderParts[0]?.toLowerCase() !== "bearer") return null;
	const [, jwt] = authHeaderParts;
	return jwt;
}
