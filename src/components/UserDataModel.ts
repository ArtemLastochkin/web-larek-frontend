import { IUserDataModel } from '../types';
import { settings } from '../utils/constants';

export class UserDataModel implements IUserDataModel {
	protected payment: string = ``;
	protected email: string = ``;
	protected phone: string = ``;
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

	setTotal(value: string | number | null) {
		this.total = Number(value);
	}

	checkPayment(): boolean {
		return (
			(this.payment === settings.onlinePayment ||
				this.payment === settings.offlinePayment) &&
			this.address !== ``
		);
	}

	clearProperty() {
		this.payment = ``;
		this.address = ``;
		this.email = ``;
		this.phone = ``;
	}
}
