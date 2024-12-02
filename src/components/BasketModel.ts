import { Card } from "../types";

export class BasketModel {
	protected cardList: Card[] = [];

	constructor() {}

	addProduct(obj: Card): void {
		this.cardList.push(obj)
	}

	delProduct(obj: Card): void {
		this.cardList
	}

	getProductList(): Card[] {
		return this.cardList
	}
}
