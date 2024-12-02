import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class Popup {
	private modalWindow: HTMLElement;
	private buttonClose: HTMLButtonElement;
	private modalContent: HTMLElement;

	constructor(idModalWindow: string, eventsEmitter: IEvents) {
		this.modalWindow = ensureElement(idModalWindow)
		this.buttonClose = ensureElement(settings.modalCloseButton, this.modalWindow) as HTMLButtonElement
		this.modalContent = ensureElement(settings.modalContent, this.modalWindow)

		this.buttonClose.addEventListener(`click`, () => {
			eventsEmitter.emit(`popup:close`)
		})

		this.modalWindow.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLElement
			if (!evtTarget.closest(settings.modalContainerClass)) {
				eventsEmitter.emit(`popup:close`)
			}
		})
		}
	

	closePopup() {
		this.modalWindow.classList.remove(settings.modalActiveClass)
	}

	clearContentPopup() {
		this.modalContent.innerHTML = ``
	}

	openPopup() {
		this.modalWindow.classList.add(settings.modalActiveClass)
	}
	
}
