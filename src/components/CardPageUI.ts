import { EventsName, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { CardUI } from './CardUI';

export class CardPageUI extends CardUI {
	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.categoryElement = ensureElement(
			settings.categorySelector,
			this.container
		);
		this.imageElement = ensureElement(
			settings.imageSelector,
			this.container
		) as HTMLImageElement;

		this.container.addEventListener(`click`, (evt: Event) => {
			const evtTarget = evt.target as HTMLElement;
			if (evtTarget.closest(settings.mainGallery)) {
				events.emit(EventsName.CardClick, { id: this.idCard });
			}
		});
	}
}
