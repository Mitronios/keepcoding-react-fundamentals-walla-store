export interface Advert {
	id: string;
	createdAt: string;
	name: string;
	sale: boolean;
	price: number;
	tags: string[];
	photo: string | null;
}

export interface AdvertFilters {
	name?: string;
	sale?: boolean;
	price?: string;
	tags?: string;
}

export interface AdvertCreatePayload {
	name: string;
	sale: boolean;
	price: number;
	tags: string[];
	photo?: File;
}
