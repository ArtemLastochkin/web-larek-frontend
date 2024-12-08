import { Card, IBasketModel } from '../types';
import { IEvents } from './base/events';

export class BasketModel implements IBasketModel {
	protected cardList: Card[] = [];
	protected cardElements: HTMLElement[] = [];

	constructor(protected events: IEvents) {}

	addProduct(obj: Card): void {
		if (!this.cardList.includes(obj)) {
			this.cardList.push(obj);
		}
		this.events.emit(`basket:changeList`);
	}

	delProduct(id: string) {
		this.cardList = this.cardList.filter((number) => number.id !== id);
		this.events.emit(`basket:changeList`);
	}

	getProductList(): Card[] {
		return this.cardList;
	}

	setElements(value: HTMLElement[]) {
		this.cardElements = value;
	}

	checkItems(): boolean {
		return this.cardList.length === 0 ? true : false;
	}

	clear() {
		this.cardList = [];
		this.cardElements = [];
		this.events.emit(`basket:changeList`);
	}

	get total(): string {
		return String(
			this.cardList.reduce(
				(acc: number, element: Card) => acc + element.price,
				0
			)
		);
	}

	get totalItems(): string {
		return String(this.cardList.length);
	}

	get elements(): HTMLElement[] {
		return this.cardElements;
	}
}
