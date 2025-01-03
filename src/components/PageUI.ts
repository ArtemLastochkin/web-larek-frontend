import { IPageUI } from '../types';
import { EventsName, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class PageUI extends Component<IPageUI> implements IPageUI {
	protected headerBasketCounter: HTMLSpanElement;
	protected headerBasketButton: HTMLButtonElement;
	protected mainGallery: HTMLElement;
	protected cardsMainGallery: HTMLElement[] = [];

	constructor(protected page: HTMLElement, event: IEvents) {
		super(page);
		this.mainGallery = ensureElement(
			settings.mainGallery,
			this.page
		) as HTMLElement;
		this.headerBasketCounter = ensureElement(
			settings.headerBasketCounterSpan,
			this.page
		);
		this.headerBasketButton = ensureElement(
			settings.headerBasketButton,
			this.page
		) as HTMLButtonElement;

		this.headerBasketButton.addEventListener(`click`, () => {
			event.emit(EventsName.ClickIconBasket);
		});
	}

	set basketCounter(value: string) {
		this.setText(this.headerBasketCounter, value);
	}

	setGallaryItem(value: HTMLElement) {
		this.cardsMainGallery.push(value);
	}

	setGallaryPage() {
		this.mainGallery.replaceChildren(...this.cardsMainGallery);
	}
}
