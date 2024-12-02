import { Api, ApiListResponse } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/BasketModel';
import { CardModel } from './components/CardModel';
import { CardUI } from './components/CardUI';
import { Popup } from './components/Popup';
import { CardFullUI } from './components/CardFullUI';
import './scss/styles.scss';
import { Card } from './types';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// =================константы=================
const cardTemplate = ensureElement(
	settings.templateCard
) as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement(
	settings.templateCardPreview
) as HTMLTemplateElement;
const mainGallery = ensureElement(settings.mainGallery);
const modalContainer = ensureElement(settings.modalContainer);
const modalContent = ensureElement(settings.modalContent, modalContainer);
const eventEmitter = new EventEmitter();
const api = new Api(API_URL);
const cardModel = new CardModel(eventEmitter);
const basketModel = new BasketModel();
const popup = new Popup(settings.modalContainer, eventEmitter);

// =================запросы=================
api
	.get(settings.productApi)
	.then((res: ApiListResponse<Card>) => {
		cardModel.setData(res);
	})
	.catch((err) => console.log(err));

// =================обработчики событий=================
// загрузка страницы
eventEmitter.on(`loaded:page`, () => {
	cardModel.getDataAllCards().forEach((objCard) => {
		const card = new CardUI(
			cloneTemplate(cardTemplate),
			eventEmitter,
			objCard.id,
			`card:click`
		);
		const element = card.render(objCard);
		mainGallery.append(element);
	});
});

// клик по карточке
eventEmitter.on<Pick<Card, `id`>>(`card:click`, ({id}) => {
	const objCard = cardModel.getDataCard(id)
	const previewCard = new CardFullUI(
		cloneTemplate(cardPreviewTemplate),
		eventEmitter,
		id,
		`card:clickAddBasket`
	);
	const element = previewCard.render(objCard);
	modalContent.append(element);
	popup.openPopup();
});

// клик по крестику или оверлей попапа
eventEmitter.on(`popup:close`, () => {
	popup.closePopup();
	popup.clearContentPopup();
});

// клик по кнопке добавить в корзину
eventEmitter.on<Pick<Card, `id`>>(`card:clickAddBasket`, ({id}) => {
	const objCard = cardModel.getDataCard(id)
	basketModel.addProduct(objCard);
	eventEmitter.emit(`popup:close`)
});