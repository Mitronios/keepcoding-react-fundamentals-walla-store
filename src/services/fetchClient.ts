let globalAccessToken: string | null = null;

const ADVERTS_BASE_URL = "http://localhost:3001/api/v1";

export const setAuthorizationHeader = (accessToken: string | null) => {
	globalAccessToken = accessToken;
};

export const customFetch = async (
	endpoint: string,
	options?: RequestInit,
): Promise<Response> => {
	const headers = new Headers(options?.headers);

	if (globalAccessToken) {
		headers.set("Authorization", `Bearer ${globalAccessToken}`);
	}

	const url = `${ADVERTS_BASE_URL}${endpoint}`;

	return fetch(url, {
		...options,
		headers,
	});
};
