export function extractBearerTokenFromAuthHeader(authHeader: string) {
	const authHeaderParts = authHeader.split(" ");
	if (authHeaderParts[0]?.toLowerCase() !== "bearer") return null;
	const [, jwt] = authHeaderParts;
	return jwt;
}
