import { IPopup } from '../types';
import { EventsName, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Popup extends Component<object> implements IPopup {
	protected modalContent: HTMLElement;
	protected modalContainer: HTMLElement;
	protected modalCloseButton: HTMLButtonElement;

	constructor(modalContainer: HTMLElement, eventEmitter: IEvents) {
		super(modalContainer)
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
			eventEmitter.emit(EventsName.PopupClose);
		});

		this.modalContainer.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLElement;
			if (evtTarget.classList.contains(settings.modalActiveClass)) {
				eventEmitter.emit(EventsName.PopupClose);
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
