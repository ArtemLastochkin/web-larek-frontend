import { Success } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class SuccessUI extends Component<Success> implements Success {
	protected totalPriceElement: HTMLParagraphElement;
	protected orderSuccessCloseElement: HTMLButtonElement;

	constructor(container: HTMLTemplateElement, event: IEvents) {
		super(container);

		this.totalPriceElement = ensureElement(
			settings.orderSuccessDescription,
			this.container
		) as HTMLParagraphElement;

		this.orderSuccessCloseElement = ensureElement(
			settings.orderSuccessClose,
			this.container
		) as HTMLButtonElement;

		this.orderSuccessCloseElement.addEventListener(`click`, () => {
			event.emit(`popup:close`);
		});
	}

	set total(value: number) {
		this.setText(this.totalPriceElement, `Списано ` + value + ` синапсов`);
	}
}
