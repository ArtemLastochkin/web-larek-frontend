import { Card } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class BasketUI extends Component<Card> {
	protected headerBasketButton: HTMLButtonElement;
	protected itemIndexElement: HTMLSpanElement;
	protected itemTitleElement: HTMLSpanElement;
	protected itemPriceElement: HTMLSpanElement;
	protected totalPriceElement: HTMLSpanElement;
	protected delButton: HTMLButtonElement;

	constructor(container: HTMLTemplateElement, events: IEvents, id?: string) {
		super(container);
		this.headerBasketButton = ensureElement(
			settings.headerBasketButton
		) as HTMLButtonElement;
		this.itemIndexElement = ensureElement(
			settings.basketItemIndex,
			this.container
		);
		this.itemTitleElement = ensureElement(
			settings.titleSelector,
			this.container
		);
		this.itemPriceElement = ensureElement(
			settings.priceSelector,
			this.container
		);
		this.totalPriceElement = ensureElement(settings.basketPrice);
		this.delButton = ensureElement(
			settings.basketItemDelete,
			this.container
		) as HTMLButtonElement;

		this.headerBasketButton.addEventListener(`click`, () => {
			events.emit(`basket:openPopup`)
		})

		this.delButton.addEventListener(`click`, (evt: Event) => {
			events.emit(`basket:clickDelButton`, { id });
		});
	}

	set title(value: string) {
		this.setText(this.itemTitleElement, value);
	}

	set price(value: string) {
		this.setText(this.itemPriceElement, Number(value) + ` синапсов`);
	}

	set index(value: string) {
		this.setText(this.itemIndexElement, value + 1);
	}

	set totalPrice(value: string | number | null) {
		this.setText(this.totalPriceElement, Number(value) + ` синапсов`);
	}
}
