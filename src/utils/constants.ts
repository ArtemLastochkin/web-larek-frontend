export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  page: `.page`,
  productApi: `/product`,
  mainGallery: `.gallery`,
  galleryItem: `.gallery__item`,

  modalContainer: `#modal-container`,
  modal: `.modal`,
  modalContainerClass: `.modal__container`,
  modalContent: `.modal__content`,
  modalActiveClass: `modal_active`,
  modalCloseButton: `.modal__close`,

  headerBasketButton: `.header__basket`,
  headerBasketCounterSpan: `.header__basket-counter`,

  modalBasket: `.basket`,
  basketItem: `.basket__item`,
  basketList: `.basket__list`,
  basketItemIndex: `.basket__item-index`,
  basketPrice: `.basket__price`,
  basketItemDelete: `.basket__item-delete`,
  basketButton: `.basket__button`,

  templateCard: `#card-catalog`,
  categorySelector: `.card__category`,
  titleSelector: `.card__title`,
  imageSelector: `.card__image`,
  priceSelector: `.card__price`, 
  textSelector: `.card__text`,
  buttonSelector: `.card__button`,
  modalPreview: `.card_full`,

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
    typePayment: `Выбирите тип оплаты`,
    requiredAddress: `Заполните адрес`,
    requiredAll: `Заполните все обязательные поля`,
    requiredTel: `Заполните номер телефона`

  },
  orderButton: `.order__button`,
  typeSubmit: `[type="submit"]`,

  nameEmail: `[name="email"]`,
  namePhone: `[name="phone"]`,

  inputSetting: {
    address: { required: true }, 
    tel: { required: true, typeTel: `tel` , pattern: `^\+7[0-9]*$` }, 
    email: { required: true, typeEmail: `email`},
  },


  templateSuccess: `#success`,
  templateCardPreview: `#card-preview`,
  templateCardBasket: `#card-basket`,
  templateBasket: `#basket`,
  templateOrder: `#order`,
  templateContacts: `#contacts`,
};


