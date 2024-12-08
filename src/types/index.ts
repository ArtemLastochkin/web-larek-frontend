import { ApiListResponse } from '../components/base/api';

export type Card = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export interface IUserDataModel {
	setIdItems(value: string[]): void
	setPayment(value: string): void
	setAddress(value: string): void
	setPhone(value: string): void
	setEmail(value: string): void
	setTotal(value: string | number | null): void
	checkPayment(): boolean
	clearProperty(): void
}

export interface ICard {
	total: number;
	cards: Card[];
	getDataAllCards(): Card[];
	getDataCard(id: string): Card;
	getDataCardToBasket(id: string): Partial<Card>;
	setData(res: ApiListResponse<Card>): void;
}

export interface IBasketModel {
	addProduct(obj: Card): void;
	delProduct(id: string): void;
	getProductList(): Card[];
	setElements(value: HTMLElement[]): void;
	checkItems(): boolean
	clear(): void;
	total: string;
	totalItems: string;
	elements: HTMLElement[];
}

export interface IPopup {
	closePopup(): void;
	openPopup(): void;
	clearContentPopup(): void;
	setContent(value: HTMLElement): void;
}

export interface IPageUI {
	basketCounter: string;
	setGallaryItem(value: HTMLElement): void;
	setGallaryPage(): void;
}

export interface ICardBasketUI extends Card {
	itemIndex: string;
}

export interface IBasketUI {
	totalPrice: string;
	itemsBasketBoolean: boolean;
	basketItems: HTMLElement[];
}

export interface IPayment {
	address: InputSettings
}

export interface IContactUI {
	email: InputSettings,
	tel: InputSettings
}

export type InputSettings = {
	required: boolean;
	typeTel: string;
	typeEmail: string;
	pattern: string;
};

export type InputSetting = {
	address: Partial<InputSettings>;
	tel: Partial<InputSettings>;
	email: Partial<InputSettings>;
};

export interface Success {
	total: number;
}

export type ResponseApiPost = Success & { id: Pick<Card, `id`> };
