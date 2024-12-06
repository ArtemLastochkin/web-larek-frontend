import { Card } from '../types';
import { settings } from '../utils/constants';
import { ensureElement, isEmpty } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class PaymentUI extends Component<{}> {
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

		this.addressInput.required = true

		this.cardButton.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLButtonElement
			event.emit(`payment:click`, { payment: `online` , button: evtTarget});
		})

		this.cashButton.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLButtonElement
			event.emit(`payment:click`, {payment: `offline` , button: evtTarget});
		})

		
		this.addressInput.addEventListener(`input`, (evt: Event) => {
			const evtTarget = evt.target as HTMLInputElement
			// console.log(this.container);
			event.emit(`payment:input`);
		});
	}
}
