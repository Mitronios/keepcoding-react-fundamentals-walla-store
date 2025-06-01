import { customFetch } from "./fetchClient";
import type { Advert } from "../interfaces/advert";

export const getAdvertById = async (id: string): Promise<Advert> => {
	try {
		const response = await customFetch(`/adverts/${id}`);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message ||
					`Error getting advert detail: id: ${id}: ${response.status}`,
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to get advert detail", error);
		throw error;
	}
};

export const deleteAdvertById = async (id: string): Promise<void> => {
	try {
		const response = await customFetch(`/adverts/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message ||
					`Error deleting advert with id ${id}: ${response.status}`,
			);
		}
	} catch (error) {
		console.error(`Failed to delete advert with id ${id}:`, error);
		throw error;
	}
};
