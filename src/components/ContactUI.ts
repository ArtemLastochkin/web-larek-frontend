import { IContactUI, InputSettings } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { FormUI } from './FormUI';

export class ContactUI extends FormUI implements IContactUI {
	protected inputTelElement: HTMLInputElement;
	protected inputEmailElement: HTMLInputElement;

	constructor(container: HTMLTemplateElement, event: IEvents) {
		super(container);
		this.inputTelElement = ensureElement(
			settings.namePhone,
			this.container
		) as HTMLInputElement;
		this.inputEmailElement = ensureElement(
			settings.nameEmail,
			this.container
		) as HTMLInputElement;

		this.container.addEventListener(`input`, (evt: Event) => {
			const evtTarget = evt.target as HTMLInputElement;
			const form = this.container as HTMLFormElement;
			event.emit(`contact:input`, {
				evtTarget: evtTarget,
				form: form,
				orderButton: this.orderButton,
				errorElement: this.errorElement,
				methodSetText: this.setText,
				methodSetDisabled: this.setDisabled
			});
		});

		this.container.addEventListener(`submit`, (evt: Event) => {
			event.emit(`contact:submit`, { evt: evt });
		});
	}

	set email(value: InputSettings) {
		this.inputEmailElement.required = value.required;
		this.inputEmailElement.setAttribute(`type`, value.typeEmail);
	}

	set tel(value: InputSettings) {
		this.inputTelElement.required = value.required;
		this.inputTelElement.setAttribute(`type`, value.typeTel);
		this.inputTelElement.setAttribute(`pattern`, value.pattern);
	}
}
