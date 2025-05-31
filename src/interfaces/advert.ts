export interface Advert {
	id: string;
	createdAt: string;
	name: string;
	sale: boolean;
	price: number;
	tags: string[];
	photo: string | null;
}
