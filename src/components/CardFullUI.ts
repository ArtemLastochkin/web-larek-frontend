import { Card, ICard } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { CardPageUI } from './CardPageUI';
import { CardUI } from './CardUI';

export class CardFullUI extends CardPageUI {
  protected buttonInBasketElement: HTMLButtonElement 

	constructor(
		container: HTMLTemplateElement,
		events: IEvents
	) {
		super(container, events);
		this.descriptionElement = ensureElement(
			settings.textSelector,
			this.container
		) as HTMLParagraphElement

		this.buttonInBasketElement = ensureElement(
			settings.buttonSelector,
			this.container
		) as HTMLButtonElement;

			this.buttonInBasketElement.addEventListener(`click`, () => {
				events.emit(`card:clickAddBasket`, { id: this.idCard })})
	}
}
