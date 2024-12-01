import { Card, ICardUI } from "../types"
import { settings } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { CardUI } from "./CardUI";

interface IPopupPreviewCard extends ICardUI {
	description: string;
}

export class PopupPreviewCardUI extends CardUI implements IPopupPreviewCard {
	protected textElement: HTMLParagraphElement;
	protected buttonInBasketElement: HTMLButtonElement;

	constructor(container: HTMLTemplateElement, events: IEvents, objCard: Card) {
		super(container, events, objCard)
		this.textElement = ensureElement(settings.textSelector, this.container) as HTMLParagraphElement
		this.buttonInBasketElement = ensureElement(settings.buttonSelector, this.container) as HTMLButtonElement
		// this.buttonInBasketElement.addEventListener(`click`, () => {
		// 	events.emit(`card:clickAddBasket`, objCard)
		// })
	}

	set description(value: string) {
		this.setText(this.textElement, value)
	}
	
}
