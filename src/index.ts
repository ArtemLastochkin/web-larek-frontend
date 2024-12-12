import { Api, ApiListResponse } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/BasketModel';
import { CardModel } from './components/CardModel';
import './scss/styles.scss';
import { Card, ResponseApiPost } from './types';
import { API_URL, EventsName, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Popup } from './components/Popup';
import { PageUI } from './components/PageUI';
import { CardFullUI } from './components/CardFullUI';
import { CardPageUI } from './components/CardPageUI';
import { CardBasketUI } from './components/CardBasketUI';
import { BasketUI } from './components/BasketUI';
import { UserDataModel } from './components/UserDataModel';
import { PaymentUI } from './components/PaymentUI';
import { ContactUI } from './components/ContactUI';
import { SuccessUI } from './components/SuccessUI';

// =================константы================
const pageElement = ensureElement(settings.page) as HTMLBodyElement;
const cardTemplate = ensureElement(
	settings.templateCard
) as HTMLTemplateElement;
const modalContainer = ensureElement(settings.modalContainer);
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
	.catch(console.error);

// =================обработчики событий=================
// загрузка карточек страницы
eventEmitter.on(EventsName.LoadPage, () => {
	cardModel.getDataAllCards().forEach((objCard) => {
		const card = new CardPageUI(cloneTemplate(cardTemplate), eventEmitter);
		const element = card.render(objCard);
		page.setGallaryItem(element);
	});
	page.setGallaryPage();
});

// клик по карточке
eventEmitter.on<{ id: string }>(EventsName.CardClick, ({ id }) => {
	const cardExample = new CardFullUI(
		cloneTemplate(settings.templateCardPreview),
		eventEmitter
	);
	const dataCard = cardModel.getDataCard(id);
	if (dataCard.price === null) {
		cardExample.changeActivityButtonInBasket(true);
	}
	const cardElement = cardExample.render(dataCard);
	popup.setContent(cardElement);
	popup.openPopup();
});

// клик по крестику или оверлей попапа
eventEmitter.on(EventsName.PopupClose, () => {
	popup.closePopup();
	popup.clearContentPopup();
});

// клик по кнопке "добавить в корзину"
eventEmitter.on<{ id: string }>(EventsName.AddCardBasket, ({ id }) => {
	const dataCard = cardModel.getDataCard(id);
	basketModel.addProduct(dataCard);
});

// изменение списка корзины
eventEmitter.on(EventsName.ChangeBasket, () => {
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
eventEmitter.on<{ id: string }>(EventsName.DeleteItemBasket, ({ id }) => {
	basketModel.delProduct(id);
	const basketItems = basketModel.elements;
	basketUI.render({
		totalPrice: basketModel.total,
		basketItems,
	});
});

// клик по корзине
eventEmitter.on(EventsName.ClickIconBasket, () => {
	const basketItems = basketModel.elements;
	const elementsBasket = basketUI.render({
		totalPrice: basketModel.total,
		basketItems,
	});
	popup.setContent(elementsBasket);
	popup.openPopup();
	userDataModel.clearProperty();
});

// клик по кнопке оформить в корзине
eventEmitter.on(EventsName.SendBasketList, () => {
	const items = basketModel.getProductList().map((element) => {
		return element.id;
	});
	userDataModel.setIdItems(items);
	const paymentExample = new PaymentUI(
		cloneTemplate(settings.templateOrder),
		eventEmitter
	);
	userDataModel.setTotal(basketModel.total);
	popup.setContent(paymentExample.render(settings.inputSetting));
});

// событие ввода адреса в форме оплаты
eventEmitter.on<{
	input: HTMLInputElement;
	changeTextError: (value?: string) => void;
	changeActivitySubmit: (value?: boolean) => void;
}>(
	EventsName.AddressChange,
	({ input, changeTextError, changeActivitySubmit }) => {
		userDataModel.setAddress(input.value);
		if (!input.validity.valid) {
			changeTextError(settings.textError.requiredAddress);
			changeActivitySubmit();
		} else if (input.validity.valid && userDataModel.checkPayment()) {
			changeTextError();
			changeActivitySubmit(false);
		} else if (input.validity.valid && !userDataModel.checkPayment()) {
			changeTextError(settings.textError.typePayment);
			changeActivitySubmit();
		}
	}
);

// событие выбор оплаты
eventEmitter.on<{
	payment: string;
	buttonClick: HTMLButtonElement;
	otherButton: HTMLButtonElement;
	changeTextError: (value?: string) => void;
	methodToggleClass(
		element: HTMLElement,
		className: string,
		force?: boolean
	): void;
	changeActivitySubmit: (value?: boolean) => void;
}>(
	EventsName.PaymentSelection,
	({
		payment,
		buttonClick,
		otherButton,
		changeTextError,
		methodToggleClass,
		changeActivitySubmit,
	}) => {
		userDataModel.setPayment(payment);
		if (
			payment === settings.onlinePayment ||
			payment === settings.offlinePayment
		) {
			methodToggleClass(buttonClick, `button_alt-active`, true);
			methodToggleClass(otherButton, `button_alt-active`, false);
		}
		if (userDataModel.checkPayment()) {
			changeTextError();
			changeActivitySubmit(false);
		} else {
			changeTextError(settings.textError.requiredAddress);
			changeActivitySubmit();
		}
	}
);

// событие отправки формы оплаты
eventEmitter.on(EventsName.PaymentSubmit, () => {
	const contactExample = new ContactUI(
		cloneTemplate(settings.templateContacts),
		eventEmitter
	);
	popup.setContent(contactExample.render(settings.inputSetting));
});

// событие ввода email
eventEmitter.on<{
	form: HTMLFormElement;
	input: HTMLInputElement;
	changeTextError: (value?: string) => void;
	changeActivitySubmit: (value?: boolean) => void;
}>(
	EventsName.EmailChange,
	({ form, input, changeTextError, changeActivitySubmit }) => {
		userDataModel.setEmail(input.value);
		if (!input.checkValidity()) {
			changeTextError(input.validationMessage);
			changeActivitySubmit();
		} else if (input.checkValidity() && !form.checkValidity()) {
			changeTextError(settings.textError.requiredTel);
			changeActivitySubmit();
		} else if (input.checkValidity() && form.checkValidity()) {
			changeTextError();
			changeActivitySubmit(false);
		}
	}
);

// событие ввода телефона
eventEmitter.on<{
	form: HTMLFormElement;
	input: HTMLInputElement;
	changeTextError: (value?: string) => void;
	changeActivitySubmit: (value?: boolean) => void;
}>(
	EventsName.PhoneChange,
	({ form, input, changeTextError, changeActivitySubmit }) => {
		userDataModel.setPhone(input.value);
		if (!input.checkValidity()) {
			changeTextError(settings.textError.requiredTel);
			changeActivitySubmit();
		} else if (input.checkValidity() && !form.checkValidity()) {
			changeTextError(settings.textError.requiredEmail);
			changeActivitySubmit();
		} else if (input.checkValidity() && form.checkValidity()) {
			changeTextError();
			changeActivitySubmit(false);
		}
		if (form.checkValidity()) {
			changeTextError();
			changeActivitySubmit(false);
		} else {
			changeActivitySubmit();
		}
	}
);

// событие sumbit контактов
eventEmitter.on(EventsName.ContactsSubmit, () => {
	api
		.post(settings.orderApi, userDataModel)
		.then((res: ResponseApiPost) => {
			basketModel.clear();
			const success = new SuccessUI(
				cloneTemplate(settings.templateSuccess),
				eventEmitter
			);
			const successElement = success.render({ total: res.total });
			popup.setContent(successElement);
		})
		.catch(console.error);
});
