import { IPopup } from '../types';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class Popup implements IPopup {
	protected modalContent: HTMLElement;
	protected modalContainer: HTMLElement;
	protected modalCloseButton: HTMLButtonElement;

	constructor(modalContainer: HTMLElement, eventEmitter: IEvents) {
		this.modalContainer = modalContainer;
		this.modalContent = ensureElement(
			settings.modalContent,
			this.modalContainer
		);
		this.modalCloseButton = ensureElement(
			settings.modalCloseButton,
			this.modalContainer
		) as HTMLButtonElement;

		this.modalCloseButton.addEventListener(`click`, () => {
			eventEmitter.emit(`popup:close`);
		});

		this.modalContainer.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLElement;
			if (evtTarget.classList.contains(settings.modalActiveClass)) {
				eventEmitter.emit(`popup:close`);
			}
		});
	}

	closePopup() {
		this.modalContainer.classList.remove(settings.modalActiveClass);
	}

	openPopup() {
		this.modalContainer.classList.add(settings.modalActiveClass);
	}

	clearContentPopup() {
		this.modalContent.innerHTML = ``;
	}

	setContent(value: HTMLElement) {
		this.modalContent.replaceChildren(value);
	}
}
