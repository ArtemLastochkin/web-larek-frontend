import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

interface IPopup {
	closePopup(popup: HTMLElement): void;
	openPopup(popup: HTMLElement, elementContent: HTMLElement): void;
}

// export class Popup implements IPopup {
// 	private modalWindow: HTMLElement;
// 	private buttonClose: HTMLButtonElement;
// 	private modalContent: HTMLElement;

// 	constructor(modalWindow: HTMLElement, modalContent: HTMLElement, eventsEmitter: IEvents) {
// 		this.modalWindow = modalWindow
// 		this.buttonClose = ensureElement(settings.modalCloseButton, this.modalWindow) as HTMLButtonElement
// 		this.modalContent = modalContent

// 		this.buttonClose.addEventListener(`click`, () => {
// 			eventsEmitter.emit(`popup:close`)
// 		})

// 		this.modalWindow.addEventListener(`click`, (evt: Event) => {
// 			const evtTarget = evt.target as HTMLElement
// 			if (!evtTarget.closest(settings.modalContainerClass)) {
// 				eventsEmitter.emit(`popup:close`)
// 			}
// 		})
// 		}

// 	closePopup() {
// 		this.modalWindow.classList.remove(settings.modalActiveClass)
// 	}

// 	clearContentPopup() {
// 		this.modalContent.innerHTML = ``
// 	}

// 	openPopup(popup: HTMLElement) {
// 		popup.classList.add(settings.modalActiveClass)
// 	}

// }

export class Popup implements IPopup {
	private modalWindows: HTMLElement[];
	private elementPopupContent: HTMLElement;

	constructor(modalWindows: HTMLElement[], eventsEmitter: IEvents) {
		this.modalWindows = modalWindows;
		this.modalWindows.forEach((element) => {
			const buttonClose = ensureElement(
				settings.modalCloseButton,
				element
			) as HTMLButtonElement;
			buttonClose.addEventListener(`click`, () => {
				const modalActive = buttonClose.closest(settings.modal);
				const data = { modalActive };
				eventsEmitter.emit(`popup:close`, data);
			});

			element.addEventListener(`click`, (evt: Event) => {
				const evtTarget = evt.target as HTMLElement;
				if (
					!evtTarget.closest(settings.modalContainerClass) &&
					!evtTarget.closest(settings.basketItem)
				) {
					const data = { modalActive: element };
					eventsEmitter.emit(`popup:close`, data);
				}
			});
		});
	}

	closePopup(popup: HTMLElement) {
		popup.classList.remove(settings.modalActiveClass);
	}

	openPopup(popup: HTMLElement, elementContent: HTMLElement) {
		popup.classList.add(settings.modalActiveClass);
		this.elementPopupContent = elementContent;
	}
}
