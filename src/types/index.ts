export type Card = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export interface ICardUI {
	category: string;
	title: string;
	image: string;
	price: string;
}