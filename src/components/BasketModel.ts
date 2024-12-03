import { Card } from "../types";
import { IEvents } from "./base/events";


export class BasketModel {
	protected cardList: Card[] = [];

	constructor(protected events: IEvents) {}

	addProduct(obj: Card): void {
		this.cardList.push(obj)
		const id = obj.id
		this.events.emit(`basket:changeProductList`)
	}

	delProduct(id: string) {	
		this.cardList = this.cardList.filter((number) => number.id !== id);
		this.events.emit(`basket:changeProductList`)
	}

	getProductList(): Card[] {
		return this.cardList
	}

	get total(): number {
		return this.cardList.reduce((acc: number, element: Card) => acc + element.price, 0);
	}

	get totalItems(): number {
		return this.cardList.length
	}

}
