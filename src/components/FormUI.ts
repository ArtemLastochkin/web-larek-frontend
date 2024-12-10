import { InputSetting } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export abstract class FormUI extends Component<InputSetting> {
	protected errorElement: HTMLSpanElement;
	protected submitButton: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this.submitButton = ensureElement(
			settings.typeSubmit,
			this.container
		) as HTMLButtonElement;
		this.errorElement = ensureElement(settings.formErrors, this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const nameInp = target.name;
			const form = this.container as HTMLFormElement;
			this.onInputChange(nameInp, target, form);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(
		nameInp: string,
		input: HTMLInputElement,
		form: HTMLFormElement
	) {
		this.events.emit(`${this.container.name}.${String(nameInp)}:change`, {
			form,
			input,
			errorElement: this.errorElement,
			submitButton: this.submitButton,
			methodSetText: this.setText,
			methodSetDisabled: this.setDisabled,
		});
	}
}
