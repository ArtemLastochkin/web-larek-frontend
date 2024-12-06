import { IBasketUI } from "../types";
import { settings } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class BasketUI extends Component<IBasketUI> implements IBasketUI {
protected totalPriceElement: HTMLElement
protected basketButton: HTMLElement
protected basketList: HTMLElement

	constructor(container: HTMLTemplateElement, event: IEvents) {
		super(container);
		this.totalPriceElement = ensureElement(settings.basketPrice, this.container);
		this.basketButton = ensureElement(settings.basketButton, this.container)
		this.basketList = ensureElement(settings.basketList, this.container) as HTMLElement

		this.basketButton.addEventListener(`click`, () => {
			event.emit(`basket:sendList`);
		});
	}

	set totalPrice(value: string) {
		this.setText(this.totalPriceElement, Number(value) + ` синапсов`);
	}

	set basketItems(value: HTMLElement[]) {
		this.basketList.replaceChildren(...value)
	}

	set itemsBasketBoolean(value: boolean) {
		this.setDisabled(this.basketButton, value)
	}
}