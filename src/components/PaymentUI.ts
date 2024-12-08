import { InputSettings } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { FormUI } from './FormUI';

export class PaymentUI extends FormUI {
	protected cardButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	protected addressInput: HTMLInputElement;

	constructor(container: HTMLTemplateElement, event: IEvents) {
		super(container);
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
				orderButton: this.orderButton,
			});
		});

		this.cashButton.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLButtonElement;
			event.emit(`payment:click`, {
				payment: settings.offlinePayment,
				buttonClick: evtTarget,
				otherButton: this.cardButton,
				errorElement: this.errorElement,
				orderButton: this.orderButton,
			});
		});

		this.addressInput.addEventListener(`input`, (evt: Event) => {
			const evtTarget = evt.target as HTMLInputElement;
			event.emit(`payment:input`, {
				input: evtTarget,
				errorElement: this.errorElement,
				orderButton: this.orderButton,
			});
		});

		this.container.addEventListener(`submit`, (evt: Event) => {
			event.emit(`payment:clickSubmit`, { evt });
		});
	}

	set address(value: InputSettings) {
		this.addressInput.required = value.required;
	}
}
