import { Card } from '../types';
import { settings } from '../utils/constants';

// type IUserDataModel = {
// 	// payment: string;
// 	// email: string;
// 	// phone: string;
// 	// address: string;
// 	// total: number;
// 	items: string[];
// }

interface IUserDataModel {
	setIdItems(value: string[]): void;
}

export class UserDataModel implements IUserDataModel {
	protected payment: string = ``;
	protected email: string = ``
	protected phone: string = ``
	protected address: string = ``;
	protected total: number;
	protected items: string[];

	constructor() {}

	setIdItems(value: string[]) {
		this.items = value;
	}

	setPayment(value: string) {
		this.payment = value;
	}

	setAddress(value: string) {
		this.address = value;
	}

	setPhone(value: string) {
		this.phone = value;
	}

	setEmail(value: string) {
		this.email = value;
	}

	checkPayment(): boolean {
		return (
			(this.payment === settings.onlinePayment ||
				this.payment === settings.offlinePayment) &&
			this.address !== ``
		);
	}

	checkContact(): boolean {
		return (
			this.email !== `` &&
			this.phone !== ``
		);
	}


	clearProperty() {
		this.payment = ``;
		this.address = ``;
		this.email = ``;
		this.phone = ``;
	}
}
