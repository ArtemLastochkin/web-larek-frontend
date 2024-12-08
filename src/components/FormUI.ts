import { InputSetting } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

export abstract class FormUI extends Component<InputSetting> {
	protected errorElement: HTMLSpanElement;
	protected orderButton: HTMLButtonElement;

	constructor(container: HTMLTemplateElement) {
		super(container);
		this.orderButton = ensureElement(
			settings.typeSubmit,
			this.container
		) as HTMLButtonElement;
		this.errorElement = ensureElement(settings.formErrors, this.container);
	}
}
