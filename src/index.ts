import { Api, ApiListResponse } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardModel } from './components/CardModel';
import { CardUI } from './components/CardUI';
import { PopupPreviewCardUI } from './components/PopupPreviewCard';
import './scss/styles.scss';
import { Card } from './types';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// =================константы=================
const cardTemplate = ensureElement(
	settings.templateCard
) as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement(settings.templateCardPreview) as HTMLTemplateElement;
const mainGallery = ensureElement(settings.mainGallery);
const modalContainer = ensureElement(settings.modalContainer)
const modalContent = ensureElement(settings.modalContent, modalContainer)
const eventEmitter = new EventEmitter();
const api = new Api(API_URL);

// =================слушатели событий=================
// клик по карточке
eventEmitter.on(`card:click`, (objCard: Card) => {
	const previewCard = new PopupPreviewCardUI(cloneTemplate(cardPreviewTemplate), eventEmitter, objCard)
	const element = previewCard.render(objCard)
	modalContent.append(element)
	modalContainer.classList.add(`modal_active`)
});

// клик по кнопке добавить в корзину
eventEmitter.on(`card:clickAddBasket`, (objCard: Card) => {

})

// =================отображение при загрузке=================
api
	.get(settings.productApi)
	.then((res: ApiListResponse<Card>) => {
		const cardModel = new CardModel(res, eventEmitter);
		cardModel.getDataAllCards().forEach((objCard) => {
			const card = new CardUI(cloneTemplate(cardTemplate), eventEmitter, objCard);
			const element = card.render(objCard)

			// element.addEventListener(`click`, () => { 
			// 	const previewCard = new PopupPreviewCardUI(cloneTemplate(cardPreviewTemplate), eventEmitter, objCard)
			// 	const element = previewCard.render(objCard)
			// 	modalContent.append(element)
			// 	modalContainer.classList.add(`modal_active`)
			// 	// eventEmitter.emit(`card:click`, objCard)
			// })

			mainGallery.append(element);
		});
	})
	.catch((err) => console.log(err));


