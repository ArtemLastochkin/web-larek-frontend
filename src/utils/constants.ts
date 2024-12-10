export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	page: `.page`,

	productApi: `/product`,
	orderApi: `/order`,

	mainGallery: `.gallery`,

	modalContainer: `#modal-container`,
	modal: `.modal`,
	modalContainerClass: `.modal__container`,
	modalContent: `.modal__content`,
	modalActiveClass: `modal_active`,
	modalCloseButton: `.modal__close`,

	headerBasketButton: `.header__basket`,
	headerBasketCounterSpan: `.header__basket-counter`,

	modalBasket: `.basket`,
	basketList: `.basket__list`,
	basketItemIndex: `.basket__item-index`,
	basketPrice: `.basket__price`,
	basketItemDelete: `.basket__item-delete`,
	basketButton: `.basket__button`,

	categorySelector: `.card__category`,
	titleSelector: `.card__title`,
	imageSelector: `.card__image`,
	priceSelector: `.card__price`,
	textSelector: `.card__text`,
	buttonSelector: `.card__button`,

	formSelector: `.form`,
	orderButtons: `.order__buttons`,
	orderField: `.order__field`,
	nameCardButton: ` [name="card"]`,
	nameCashButton: ` [name="cash"]`,
	nameAddress: `[name="address"]`,
	onlinePayment: `online`,
	offlinePayment: `offline`,
	formErrors: `.form__errors`,
	textError: {
		nonError: ``,
		typePayment: `Выберите тип оплаты`,
		requiredAddress: `Заполните адрес`,
		requiredAll: `Заполните все обязательные поля`,
		requiredTel: `Заполните номер телефона, номер должен содержать только цифры и начинаться с "+7"`,
		requiredEmail: `Заполните Email`,
	},
	orderButton: `.order__button`,
	typeSubmit: `[type="submit"]`,

	nameEmail: `[name="email"]`,
	namePhone: `[name="phone"]`,

	inputSetting: {
		address: { required: true },
		tel: { required: true, typeTel: `tel`, pattern: `^[+][7] \?[ 0-9]*$` },
		email: { required: true, typeEmail: `email` },
	},

	orderSuccessDescription: `.order-success__description`,
	orderSuccessClose: `.order-success__close`,

	templateCard: `#card-catalog`,
	templateSuccess: `#success`,
	templateCardPreview: `#card-preview`,
	templateCardBasket: `#card-basket`,
	templateBasket: `#basket`,
	templateOrder: `#order`,
	templateContacts: `#contacts`,
};

/**
 * Названия событий
 */
export enum EventsName {
	LoadPage = `loaded:page`,
	CardClick = `card:click`,
	PopupClose = `popup:close`,
	AddCardBasket = `card:clickAddBasket`,
	ChangeBasket = `basket:changeList`,
	DeleteItemBasket = `card:delItemBasket`,
	ClickIconBasket = `headerBasketButton:click`,
	SendBasketList = `basket:sendList`,
	AddressChange = `order.address:change`,
	PaymentSelection = `payment:click`,
	PaymentSubmit = `order:submit`,
	EmailChange = `contacts.email:change`,
	PhoneChange = `contacts.phone:change`,
	ContactsSubmit = `contacts:submit`,
}
