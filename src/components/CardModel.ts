import { Card } from "../types";
import { ApiListResponse } from "./base/api";
import { IEvents } from "./base/events";


interface ICard {
	total: number;
	cards: Card[];
	getDataCard(id: string): Card;
}

export class CardModel implements ICard {
	total: number;
	cards: Card[];

	constructor(obj: ApiListResponse<Card>, events: IEvents) {
		this.total = obj.total
		this.cards = obj.items
	}

	getDataAllCards(): Card[] {
		return this.cards
	}

	getDataCard(id: string): Card {
		return this.cards.filter((e: Card) => e.id === id)[0]
	}
}
