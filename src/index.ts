import { Api, ApiListResponse } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/BasketModel';
import { CardModel } from './components/CardModel';
// import { CardUI } from './components/CardUI';
// import { Popup } from './components/Popup';
// import { CardFullUI } from './components/CardFullUI';
import './scss/styles.scss';
import { Card } from './types';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureAllElements, ensureElement } from './utils/utils';
// import { BasketUI } from './components/BasketUI';
import { Popup } from './components/Popup';
import { PageUI } from './components/PageUI';
import { CardFullUI } from './components/CardFullUI';
import { CardPageUI } from './components/CardPageUI';
import { CardBasketUI } from './components/CardBasketUI';
import { BasketUI } from './components/BasketUI';
import { UserDataModel } from './components/UserDataModel';
import { PaymentUI } from './components/PaymentUI';
import { ContactUI } from './components/ContactUI';

// =================константы=================
const pageElement = ensureElement(settings.page) as HTMLBodyElement;
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
const userDataModel = new UserDataModel();
const page = new PageUI(pageElement, eventEmitter);
const basketUI = new BasketUI(
	cloneTemplate(settings.templateBasket),
	eventEmitter
);
const popup = new Popup(modalContainer, eventEmitter);

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
		const card = new CardPageUI(cloneTemplate(cardTemplate), eventEmitter);
		const element = card.render(objCard);
		page.setGallaryItem(element);
	});
	page.setGallaryPage();
});

// клик по карточке
eventEmitter.on<Pick<Card, `id`>>(`card:click`, ({ id }) => {
	const cardExample = new CardFullUI(
		cloneTemplate(settings.templateCardPreview),
		eventEmitter
	);
	const dataCard = cardModel.getDataCard(id);
	const elementCard = cardExample.render(dataCard);
	popup.setContent(elementCard);
	popup.openPopup();
});

// клик по крестику или оверлей попапа
eventEmitter.on(`popup:close`, () => {
	popup.closePopup();
	popup.clearContentPopup();
});

// клик по кнопке "добавить в корзину"
eventEmitter.on<{ id: string }>(`card:clickAddBasket`, ({ id }) => {
	const dataCard = cardModel.getDataCard(id);
	basketModel.addProduct(dataCard);
});

// изменение списка корзины
eventEmitter.on(`basket:changeList`, () => {
	page.render({ basketCounter: basketModel.totalItems });
	const itemsBasketBoolean = basketModel.checkItems();
	basketUI.render({ itemsBasketBoolean });
	const basketDataCards = basketModel.getProductList();

	const elementsBasket = basketDataCards.map((element, itemIndex) => {
		const cardExample = new CardBasketUI(
			cloneTemplate(settings.templateCardBasket),
			eventEmitter
		);
		const elementCardBasket = cardExample.render(
			Object.assign(element, { itemIndex })
		);
		return elementCardBasket;
	});
	basketModel.setElements(elementsBasket);
});

// клик по кнопке удаления элемента в корзине
eventEmitter.on<{ id: string }>(`card:delItemBasket`, ({ id }) => {
	basketModel.delProduct(id);
	const basketItems = basketModel.elements;
	basketUI.render({
		totalPrice: basketModel.total,
		basketItems,
	});
});

// клик по корзине
eventEmitter.on(`headerBasketButton:click`, () => {
	const basketItems = basketModel.elements;
	const elementsBasket = basketUI.render({
		totalPrice: basketModel.total,
		basketItems,
	});
	popup.setContent(elementsBasket);
	popup.openPopup();
});

// клик по кнопке оформить в корзине
eventEmitter.on(`basket:sendList`, () => {
	const items = basketModel.getProductList().map((element) => {
		return element.id;
	});
	userDataModel.setIdItems(items);
	const paymentExample = new PaymentUI(
		cloneTemplate(settings.templateOrder),
		eventEmitter
	);
	popup.setContent(paymentExample.render(settings.inputSetting));
	userDataModel.clearProperty();
});

// событие ввода
eventEmitter.on<{
	input: HTMLInputElement;
	errorElement: HTMLElement;
	orderButton: HTMLButtonElement;
}>(`payment:input`, ({ input, errorElement, orderButton }) => {
	userDataModel.setAddress(input.value);
	if (!input.validity.valid) {
		errorElement.textContent = settings.textError.requiredAddress;
		orderButton.disabled = true;
	} else if (input.validity.valid && userDataModel.checkPayment()) {
		errorElement.textContent = settings.textError.nonError;
		orderButton.disabled = false;
	} else if (input.validity.valid && !userDataModel.checkPayment()) {
		errorElement.textContent = settings.textError.typePayment;
		orderButton.disabled = true;
	}
});

// событие выбор оплаты
eventEmitter.on<{
	payment: string;
	buttonClick: HTMLButtonElement;
	otherButton: HTMLButtonElement;
	errorElement: HTMLElement;
	orderButton: HTMLButtonElement;
}>(
	`payment:click`,
	({ payment, buttonClick, otherButton, errorElement, orderButton }) => {
		userDataModel.setPayment(payment);
		if (
			payment === settings.onlinePayment ||
			payment === settings.offlinePayment
		) {
			buttonClick.classList.toggle(`button_alt-active`, true);
			otherButton.classList.toggle(`button_alt-active`, false);
		}
		if (userDataModel.checkPayment()) {
			errorElement.textContent = settings.textError.nonError;
			orderButton.disabled = false;
		} else {
			orderButton.disabled = true;
			errorElement.textContent = settings.textError.requiredAddress;
		}
	}
);

// событие отправки формы оплаты
eventEmitter.on<{
	evt: Event;
}>(`payment:clickSubmit`, ({ evt }) => {
	evt.preventDefault();
	const contactExample = new ContactUI(
		cloneTemplate(settings.templateContacts),
		eventEmitter
	);
	popup.setContent(contactExample.render(settings.inputSetting));
});

// событие ввода
eventEmitter.on<{
	evtTarget: HTMLInputElement;
	form: HTMLFormElement;
	orderButton: HTMLButtonElement;
	errorElement: HTMLSpanElement
}>(`contact:input`, ({ evtTarget, form, orderButton, errorElement }) => {
	if (evtTarget.getAttribute(`name`) === `email`) {
		userDataModel.setEmail(evtTarget.value);
		if (!userDataModel.checkContact() && evtTarget.validity.valid) {
			errorElement.textContent = settings.textError.requiredTel
			
		}


		
	} else if (evtTarget.getAttribute(`name`) === `phone`) {
		userDataModel.setPhone(evtTarget.value);
	}

	

	// if (form.checkValidity() && userDataModel.checkContact()) {
	// 	orderButton.disabled = false;
	// 	errorElement.textContent = settings.textError.nonError
	// } else {
	// 	errorElement.textContent = settings.textError.requiredAll
	// 	orderButton.disabled = true;
	// }
});
