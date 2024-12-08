import { Card, ICard } from '../types';
import { ApiListResponse } from './base/api';
import { IEvents } from './base/events';

export class CardModel implements ICard {
	total: number;
	cards: Card[];

	constructor(protected eventEmitter: IEvents) {}

	getDataAllCards(): Card[] {
		return this.cards;
	}

	getDataCard(id: string): Card {
		return this.cards.filter((e: Card) => e.id === id)[0];
	}

	getDataCardToBasket(id: string): Partial<Card> {
		const cardObj = this.cards.filter((e: Card) => e.id === id)[0];
		const newCardObj = { title: cardObj.title, price: cardObj.price };
		return newCardObj;
	}

	setData(res: ApiListResponse<Card>) {
		this.cards = res.items;
		this.total = res.total;
		this.eventEmitter.emit(`loaded:page`);
		this.eventEmitter.emit(`basket:changeList`);
	}
}
