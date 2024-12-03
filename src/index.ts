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
import { cloneTemplate, ensureAllElements, ensureElement } from './utils/utils';
import { BasketUI } from './components/BasketUI';

// =================константы=================
const cardTemplate = ensureElement(
	settings.templateCard
) as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement(
	settings.templateCardPreview
) as HTMLTemplateElement;
const mainGallery = ensureElement(settings.mainGallery);
const modals = ensureAllElements(settings.modal);
const modalContainer = ensureElement(settings.modalContainer);
const modalContent = ensureElement(settings.modalContent, modalContainer);
const templateCardBasket = ensureElement(
	settings.templateCardBasket
) as HTMLTemplateElement;
const modalBasketList = ensureElement(settings.basketList);
const headerBasketButton = ensureElement(settings.headerBasketButton);
const headerBasketCounterSpan = ensureElement(settings.headerBasketCounterSpan);

const eventEmitter = new EventEmitter();
const api = new Api(API_URL);
const cardModel = new CardModel(eventEmitter);
const basketModel = new BasketModel(eventEmitter);
const popup = new Popup(modals, eventEmitter);

// при загрузке страницы

function callback() {
	popup.openPopup(modalBasketList.closest(settings.modal), modalBasketList);
}

eventEmitter.on(`basket:openPopup`, callback);

// =================api запросы=================
api
	.get(settings.productApi)
	.then((res: ApiListResponse<Card>) => {
		cardModel.setData(res);
	})
	.catch((err) => console.log(err));

// =================обработчики событий=================
// загрузка карточек страницы
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
eventEmitter.on<Pick<Card, `id`>>(`card:click`, ({ id }) => {
	const objCard = cardModel.getDataCard(id);
	const previewCard = new CardFullUI(
		cloneTemplate(cardPreviewTemplate),
		eventEmitter,
		id,
		`card:clickAddBasket`
	);
	const element = previewCard.render(objCard);
	modalContent.replaceChildren(element);
	popup.openPopup(modalContent.closest(settings.modal), modalContent);
});

// клик по крестику или оверлей попапа
eventEmitter.on<{ modalActive: HTMLElement }>(
	`popup:close`,
	({ modalActive }) => {
		popup.closePopup(modalActive);
	}
);

// клик по кнопке "добавить в корзину"
eventEmitter.on<{ id: string; evtTarget: HTMLElement }>(
	`card:clickAddBasket`,
	({ id, evtTarget }) => {
		const objCard = cardModel.getDataCard(id);
		basketModel.addProduct(objCard);

		const modalActive = evtTarget.closest(settings.modal);
		eventEmitter.emit(`popup:close`, { modalActive });
	}
);

// клик по кнопке удаления элемента в корзине
eventEmitter.on<{ id: string }>(`basket:clickDelButton`, ({ id }) => {
	basketModel.delProduct(id);
});

// изменениие списка корзины
eventEmitter.on(`basket:changeProductList`, () => {
	headerBasketCounterSpan.textContent = String(basketModel.totalItems);

	const basketList = basketModel.getProductList();
	const totalPrice = basketModel.total		
	
	const arrElementsHTML: HTMLElement[] = [];

	basketList.forEach((element, index) => {
		const basket = new BasketUI(
			cloneTemplate(templateCardBasket),
			eventEmitter,
			element.id
		);
		const objNew = Object.assign({ index, totalPrice }, element);
		const basketElement = basket.render(objNew);
		arrElementsHTML.push(basketElement);
	});
	modalBasketList.replaceChildren(...arrElementsHTML);

if (!basketList.length) {
	console.log(`da`);
}







})
