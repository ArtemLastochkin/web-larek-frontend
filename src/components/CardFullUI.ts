import { Card, ICardUI } from "../types"
import { settings } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { CardUI } from "./CardUI";

interface IPopupPreviewCard extends ICardUI {
	description: string;
}

export class CardFullUI extends CardUI implements IPopupPreviewCard {
	protected textElement: HTMLParagraphElement;
	protected buttonInBasketElement: HTMLButtonElement;

	constructor(container: HTMLTemplateElement, events: IEvents, id: string, eventName: string) {
		super(container, events, id)
		this.textElement = ensureElement(settings.textSelector, this.container) as HTMLParagraphElement
		this.buttonInBasketElement = ensureElement(settings.buttonSelector, this.container) as HTMLButtonElement

		if (eventName === `card:clickAddBasket`) {
			this.buttonInBasketElement.addEventListener(`click`, () => {
			events.emit(eventName, {id})
		})}
	}

	set description(value: string) {
		this.setText(this.textElement, value)
	}
	
}
