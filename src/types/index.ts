import { ApiListResponse } from "../components/base/api";

export type Card = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export interface ICard {
	total: number;
	cards: Card[];
	getDataAllCards(): Card[]
	getDataCard(id: string): Card;
	getDataCardToBasket(id: string): Partial<Card>
	setData(res: ApiListResponse<Card>): void;
}

export interface IBasketModel {
	addProduct(obj: Card): void;
	delProduct(id: string): void;
	getProductList(): Card[];
	setElements(value: HTMLElement[]): void
	total: string;
	totalItems: string;
	elements: HTMLElement[]
}

// export interface ICardUI {
// 	category: string;
// 	title: string;
// 	image: string;
// 	price: string;
// }