import { Card, ICardUI } from '../types';
import { CDN_URL, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class CardUI extends Component<Card> implements ICardUI {
	protected categoryElement: HTMLSpanElement;
	protected titleElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected priceElement: HTMLSpanElement;

	constructor(
		container: HTMLElement,
		events: IEvents,
		id: string,
		eventName?: string,
	) {
		super(container);
		this.categoryElement = ensureElement(
			settings.categorySelector,
			this.container
		);
		this.titleElement = ensureElement(settings.titleSelector, this.container);
		this.imageElement = ensureElement(
			settings.imageSelector,
			this.container
		) as HTMLImageElement;
		this.priceElement = ensureElement(settings.priceSelector, this.container);

		if (eventName === `card:click`) {
			this.container.addEventListener(`click`, () => {
				events.emit(eventName, {id});
			});
		}
	}

	set category(value: string) {
		this.setText(this.categoryElement, value);
		super.toggleClass(
			this.categoryElement,
			`card__category_soft`,
			value === `софт-скил`
		);
		super.toggleClass(
			this.categoryElement,
			`card__category_other`,
			value === `другое`
		);
		super.toggleClass(
			this.categoryElement,
			`card__category_hard`,
			value === `хард-скил`
		);
		super.toggleClass(
			this.categoryElement,
			`card__category_button`,
			value === `кнопка`
		);
		super.toggleClass(
			this.categoryElement,
			`card__category_additional`,
			value === `дополнительное`
		);
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}

	set image(value: string) {
		this.setImage(this.imageElement, CDN_URL + value);
	}

	set price(value: string) {
		this.setText(this.priceElement, Number(value) + ` синапсов`);
	}
}
