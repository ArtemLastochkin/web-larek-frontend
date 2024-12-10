import { InputSettings, IPayment } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { FormUI } from './FormUI';

export class PaymentUI extends FormUI implements IPayment {
	protected cardButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	protected addressInput: HTMLInputElement;

	constructor(container: HTMLFormElement, event: IEvents) {
		super(container, event);
		this.cardButton = ensureElement(
			settings.orderButtons + settings.nameCardButton,
			container
		) as HTMLButtonElement;

		this.cashButton = ensureElement(
			settings.orderButtons + settings.nameCashButton,
			container
		) as HTMLButtonElement;

		this.addressInput = ensureElement(
			settings.nameAddress,
			container
		) as HTMLInputElement;

		this.cardButton.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLButtonElement;
			event.emit(`payment:click`, {
				payment: settings.onlinePayment,
				buttonClick: evtTarget,
				otherButton: this.cashButton,
				errorElement: this.errorElement,
				submitButton: this.submitButton,
				methodSetText: this.setText,
				methodSetDisabled: this.setDisabled,
			});
		});

		this.cashButton.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLButtonElement;
			event.emit(`payment:click`, {
				payment: settings.offlinePayment,
				buttonClick: evtTarget,
				otherButton: this.cardButton,
				errorElement: this.errorElement,
				submitButton: this.submitButton,
				methodSetText: this.setText,
				methodSetDisabled: this.setDisabled,
			});
		});
	}

	set address(value: InputSettings) {
		this.addressInput.required = value.required;
	}
}
