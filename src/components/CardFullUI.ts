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
		events: IEvents,
		id: string,
	) {
		super(container, events, id);
		this.descriptionElement = ensureElement(
			settings.textSelector,
			this.container
		) as HTMLParagraphElement

		this.buttonInBasketElement = ensureElement(
			settings.buttonSelector,
			this.container
		) as HTMLButtonElement;

		
			this.buttonInBasketElement.addEventListener(`click`, (evt: Event) => {
				const evtTarget = evt.target as HTMLElement;
				events.emit(`card:clickAddBasket`, { id, evtTarget })})
	}

	// set description(value: string) {
	// 	this.setText(this.textElement, value);
	// }
}
