import { Card } from '../types';
import { ApiListResponse } from './base/api';
import { EventEmitter, IEvents } from './base/events';

interface ICard {
	total: number;
	cards: Card[];
	getDataCard(id: string): Card;
	setData(res: ApiListResponse<Card>): void;
}

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

	setData(res: ApiListResponse<Card>) {
		this.cards = res.items;
		this.total = res.total;
		this.eventEmitter.emit(`loaded:page`);
	}
}
