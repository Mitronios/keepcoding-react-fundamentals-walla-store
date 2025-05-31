import type { Advert, AdvertFilters } from "../interfaces/advert";

const ADVERTS_BASE_URL = "http://localhost:3001/api/v1";

const buildQueryURL = (filters?: AdvertFilters): string => {
	const queryParams = new URLSearchParams();

	Object.entries(filters || {}).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			queryParams.append(key, String(value));
		}
	});

	return `${ADVERTS_BASE_URL}/adverts${
		queryParams.toString() ? `?${queryParams}` : ""
	}`;
};

export const getAdverts = async (
	filters?: AdvertFilters,
): Promise<Advert[]> => {
	const url = buildQueryURL(filters);

	try {
		const response = await fetch(url);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `Something went wrong ${response.status}`,
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to get adverts:", error);
		throw error;
	}
};

export const getAvailableTags = async (): Promise<string[]> => {
	try {
		const response = await fetch(`${ADVERTS_BASE_URL}/adverts/tags`);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message ||
					`Uh oh! we cant process your request. ${response.status}`,
			);
		}

		const tags = await response.json();
		return tags;
	} catch (error) {
		console.error("Failed to get tags:", error);
		throw error;
	}
};
