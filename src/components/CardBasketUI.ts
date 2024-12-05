import { Card, ICard } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { CardPageUI } from './CardPageUI';
import { CardUI } from './CardUI';

interface ICardBasketUI {
	itemIndex: string
}

export class CardBasketUI extends CardUI implements ICardBasketUI {
  protected buttonInBasketElement: HTMLButtonElement 
	protected counterItem: HTMLElement
	protected itemIndexElement: HTMLSpanElement 
	protected itemDeleteButton: HTMLButtonElement

	constructor(
		container: HTMLTemplateElement,
		events: IEvents,
		id: string,
	) {
		super(container);
		this.buttonInBasketElement = ensureElement(
			settings.buttonSelector,
			this.container
		) as HTMLButtonElement;

		this.itemIndexElement = ensureElement(
			settings.basketItemIndex,
			this.container
		) as HTMLSpanElement;

		this.itemDeleteButton = ensureElement(settings.basketItemDelete, this.container) as HTMLButtonElement

		this.itemDeleteButton.addEventListener(`click`, () => {
			events.emit(`card:delItemBasket`, { id })})
	}

	set itemIndex(value: string) {
		this.setText(this.itemIndexElement, value + 1 )
	}
}
