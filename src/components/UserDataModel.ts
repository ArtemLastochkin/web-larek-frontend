import { Card } from '../types';

// type IUserDataModel = {
// 	// payment: string;
// 	// email: string;
// 	// phone: string;
// 	// address: string;
// 	// total: number;
// 	items: string[];
// }

interface IUserDataModel {
	setIdItems(value: string[]): void
}


export class UserDataModel implements IUserDataModel{
	protected payment: string;
	protected email: string;
	protected phone: string;
	protected address: string;
	protected total: number;
	protected items: string[];

	constructor() {}

	setIdItems(value: string[]) {
		this.items = value
	}

	setPayment(value: string) {
		this.payment = value
	}

}
