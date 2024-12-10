import { ICardFullUI } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { CardPageUI } from './CardPageUI';

export class CardFullUI extends CardPageUI implements ICardFullUI {
	protected buttonInBasketElement: HTMLButtonElement;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container, events);
		this.descriptionElement = ensureElement(
			settings.textSelector,
			this.container
		) as HTMLParagraphElement;

		this.buttonInBasketElement = ensureElement(
			settings.buttonSelector,
			this.container
		) as HTMLButtonElement;

		this.buttonInBasketElement.addEventListener(`click`, () => {
			events.emit(`card:clickAddBasket`, { id: this.idCard });
		});
	}

	changeActivityButtonInBasket(value: boolean) {
		this.setDisabled(this.buttonInBasketElement, value);
	}
}
