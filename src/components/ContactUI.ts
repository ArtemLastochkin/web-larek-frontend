import { IContactUI, InputSettings } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { FormUI } from './FormUI';

export class ContactUI extends FormUI implements IContactUI {
	protected inputTelElement: HTMLInputElement;
	protected inputEmailElement: HTMLInputElement;

	constructor(container: HTMLFormElement, event: IEvents) {
		super(container, event);
		this.inputTelElement = ensureElement(
			settings.namePhone,
			this.container
		) as HTMLInputElement;
		this.inputEmailElement = ensureElement(
			settings.nameEmail,
			this.container
		) as HTMLInputElement;
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
