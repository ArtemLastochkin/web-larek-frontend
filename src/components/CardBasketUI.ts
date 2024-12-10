import { ICardBasketUI } from '../types';
import { EventsName, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { CardUI } from './CardUI';

export class CardBasketUI extends CardUI implements ICardBasketUI {
	protected itemIndexElement: HTMLSpanElement;
	protected itemDeleteButton: HTMLButtonElement;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.itemIndexElement = ensureElement(
			settings.basketItemIndex,
			this.container
		) as HTMLSpanElement;

		this.itemDeleteButton = ensureElement(
			settings.basketItemDelete,
			this.container
		) as HTMLButtonElement;

		this.itemDeleteButton.addEventListener(`click`, () => {
			events.emit(EventsName.DeleteItemBasket, { id: this.idCard });
		});
	}

	set itemIndex(value: string) {
		this.setText(this.itemIndexElement, value + 1);
	}
}
