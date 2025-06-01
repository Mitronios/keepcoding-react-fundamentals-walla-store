import type { AdvertCreatePayload } from "../interfaces/advert";
import { customFetch } from "./fetchClient";

export const advertCreateService = async (advertData: AdvertCreatePayload) => {
	const formData = new FormData();

	formData.append("name", String(advertData.name));
	formData.append("sale", String(advertData.sale));
	formData.append("price", String(advertData.price));

	if (Array.isArray(advertData.tags)) {
		advertData.tags.forEach((tag) => {
			formData.append("tags", tag);
		});
	} else {
		console.warn(
			"AdvertCreatePayload.tags is not an array as expected:",
			advertData.tags,
		);
	}

	if (advertData.photo) {
		formData.append("photo", advertData.photo);
	}

	try {
		const response = await customFetch("/adverts", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to create advert");
		}

		return response.json();
	} catch (error) {
		console.error("Error creating advert:", error);
		throw error;
	}
};
