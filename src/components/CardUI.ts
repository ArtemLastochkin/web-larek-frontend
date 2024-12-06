import { Card, ICard } from '../types';
import { CDN_URL, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class CardUI extends Component<Card> implements Card {
	protected categoryElement: HTMLSpanElement;
	protected titleElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected priceElement: HTMLSpanElement;
	protected descriptionElement: HTMLParagraphElement;
	protected idCard: string;

	constructor(container: HTMLElement) {
		super(container);
		this.titleElement = ensureElement(settings.titleSelector, this.container);
		this.priceElement = ensureElement(settings.priceSelector, this.container);
	}

	set category(value: string) {
		this.setText(this.categoryElement, value);
		if (this.categoryElement !== undefined) {
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
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}

	set image(value: string) {
		this.setImage(this.imageElement, CDN_URL + value);
	}

	set price(value: number | null) {
		this.setText(this.priceElement, Number(value) + ` синапсов`);
	}

	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}

	set id(value: string) {
		this.idCard = value
	}
}
