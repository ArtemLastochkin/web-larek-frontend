# Проектная работа "Веб-ларек"

WEB-ларёк это интернет магазин с товарами для веб-разработчиков. В нем можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ.

Стек: HTML, SCSS, TS, Webpack

Инструменты линтинга и форматирования подключены.

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код

1. Класс EventEmitter  
   Позволяет подписываться на события и уведомлять подписчиков о наступлении события.
   Класс имеет методы on , off , emit — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно.
   Дополнительно реализованы методы onAll и offAll — для подписки на все события и сброса всех подписчиков.
   Интересным дополнением является метод trigger , генерирующий заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы.
   Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter. Экземпляр создается при загрузке страницы.

2. Класс Api  
   Предназначен для получения данных и отправки на сервер. Конструктор класса принимает два параметра baseUrl - базовый URL и options - объект с настройками.
   Имеет публичные методы get , post для получения и отправки данных на сервер, а также защищенный метод handleResponse который обрабатывает ответ запроса.

3. Класс Component  
   Абстрактный класс, является общим для классов отображения. Принимает параметром шаблон HTML элемента и вызывается в конструкторах дочерних классов.
   Содержит методы для работы с разметкой.

Методы класса:

- toggleClass(element: HTMLElement, className: string, force?: boolean) - Переключает класс на HTML на переданном элементе

- protected setText(element: HTMLElement, value: unknown) - Устанавливает текстовое содежимое HTML элемента, принимает 2 обязательных параметра, HTML элемент и значение текста

- setDisabled(element: HTMLElement, state: boolean) - Устанавливает или убирает статус Disabled. Принимает параметром HTML элемент и булево значение

- setHidden(element: HTMLElement) - Скрывает элемент разметки

- setVisible(element: HTMLElement) - Показывает элемент разметки

- protected setImage(element: HTMLImageElement, src: string, alt?: string) - Устанавливает значение атрибута src в переданном HTML img элементе. Уставновка атрибута alt является необязательным параметром

- render(data?: Partial<T>): HTMLElement - Принимает параметром объект типа Partial<T> где <T> передано ранее при extends в доченем классе. Копирует свойства из переданного объекта, в объект контекста и возвращает переданный в конструктор шаблон HTML элемента

## Модели данных

Компоненты данной группы, хранят необходимые данные для дальнейшей обработки.

1.  Класс CardModel  
    Класс хранит данные полученные с сервера и предоставляет публичные методы для работы с данными карточек. Конструктор класса принимает параметром брокер событий для дальнейшего использования в методах класса. Создание нового экземпляра класса предоставляет доступ к его методам. Экземпляр создается при загрузке страницы.

Свойства объекта:

- total: number - Общее количество карточек

- cards: Card[] - Массив с объектами карточек

Методы класса:

- getDataAllCards(): Card[] - Возвращает массив с объектами карточек

- getDataCard(id: string): Card - Возвращает объект карточки с переданным в параметре id

- getDataCardToBasket(id: string): Partial<Card> - Возвращает объект карточки, с переданным в параметре id, состоящий из двух полей в виде { title, price }

- setData(res: ApiListResponse<Card>) - Сохраняет данные в классе. Получает в параеметре объект по типу ApiListResponse<Card> от сервера. Вызывает события "загрузки страницы" и "списка корзины"

2.  Класс BasketModel  
    Корзина это список товаров которые пользователь хочет купить. Класс хранит в себе массивы с объектами и HTML элементами карточек и соответствует интерфейсу IBasketModel. Изменение списка товаров и получение необходимой информации о корзине возможно с помощью методов класса. Конструктор класса принимает параметром брокер событий для дальнейшего использования в методах класса. Создание нового экземпляра класса предоставляет доступ к его методам. Экземпляр создается при загрузке страницы.

Свойства класса:

- cardList: Card[] - Массив с объектами карточек

- cardElements: HTMLElement[] - Массив с HTML элементами карточек

Методы класса:

- setElements(value: HTMLElement[]) - Записывает переданной значение в свойство cardElements. Принимает на вход массив HTML элементов

- addProduct(obj: Card): void - Добавляет объект в свойство cardList, при условии что такого объекта в свойстве еще нет. Вызывает событие изменение списка карточек в корзине

- delProduct(id: string) - Удаляет карточку из свойства cardList. Вызывает событие изменение списка карточек в корзине

- getProductList(): Card[] - Возвращает массив с объектами карточек из свойства cardList

- checkItems(): boolean - Вызов метода проверяет наличие элементов в корзине и возвращает true = корзина пуста, false = корзина не пуста

- clear():void - Метод очищает корзину

- get total(): string - геттер возвращает общую стоимость всех элементов корзины в виде строки

- get totalItems(): string - свойство-геттер возвращает общее количество элементов корзины в виде строки

- get elements(): HTMLElement[] - свойство-геттер возвращает массив HTML элементов корзины

3.  Класс UserDataModel  
    Компонент хранит в себе данные результата взаимодействия пользователя с приложением и предоставляет методы для работы с ними, соответствует интерфейсу IUserDataModel.
    Конструктор класса не принимает параметров и не выполняет никакх действий.
    Создание нового экземпляра класса предоставляет доступ к его методам. Экземпляр создается при загрузке страницы.

Свойства класса:

- payment: string - Поле хранит результат выбора способа оплаты в виде строки, изначально инициализировано пустой строкой

- email: string - Поле хранит результат ввода email в виде строки, изначально инициализировано пустой строкой

- phone: string - Поле хранит результат ввода номера телефона в виде строки, изначально инициализировано пустой строкой

- address: string - Поле хранит результат ввода адреса в виде строки, изначально инициализировано пустой строкой

- total: number - Поле хранит сумму всех товаров в корзине

- items: string[] - Поле хранит массив состоящий из id товаров из корзины

Методы класса:

- setIdItems(value: string[]): void - Принимает на вход массив из id товаров и присваивает значению свойству items

- setPayment(value: string): void - Принимает на вход строку и присваивает значение свойству payment

- setAddress(value: string): void - Принимает на вход строку и присваивает значение свойству address

- setPhone(value: string): void - Принимает на вход строку и присваивает значение свойству phone

- setEmail(value: string): void - Принимает на вход строку и присваивает значение свойству email

- setTotal(value: string | number | null): void - Принимает на вход строку или число или null и присваивает значение свойству total

- checkPayment(): boolean - Возвращает булево значение если на данный момент уже выбран способ оплаты и заполнен адрес

- clearProperty(): void - очищает поля payment address email phone

## Отображение

Компоненты данной группы отображают элементы на странице и устанавливают слушателей событий.

1.  Класс Popup  
    Компонент хранит HTML элементы - модального окна и его элементов, отвечает за показ и скрытие модального окна, а также устанавливает слушатель события на кнопку закрытия и оверлей модального окна. Класс соответствует интерфейсу IPopup. Конструктор класса принимает HTML элемент модального окна и брокер событий. Создание нового экземпляра класса предоставляет доступ к его методам, инициализирует свойства класса и вешает слушатели событий на элементы. Экземпляр создается при загрузке страницы.

Свойства класса:

- modalContent: HTMLElement - HTML элемент контента в модальном окне

- modalContainer: HTMLElement - Модальное окно

- modalCloseButton: HTMLButtonElement - Кнопка закрытия модального окна

Методы класса:

- closePopup() - Закрывает модальное окно

- openPopup() - Открывает модальное окно

- clearContentPopup() - Очищает весь контент внутри модального окна

- setContent(value: HTMLElement) - Заполняет контент внутри модального окна. В параметрах принимает HTML разметку

2.  Класс PageUI  
    Компонент отвечает за отображение элементов главной страницы. Конструктор класса принимает параметром тело страницы и брокер событий. Создание экземпляра класса происходит при загрузке страницы и инициализирует свойства, вешает слушатель на кнопку корзины. Класс соответствует интерфейсу IPageUI. Класс расширяет компонент Component<IPageUI>

Свойства класса:

- headerBasketCounter: HTMLSpanElement - Харнит HTML элемент счетчика количества элементов в корзине

- headerBasketButton: HTMLButtonElement - Харнит HTML элемент кнопки корзины

- mainGallery: HTMLElement - Харнит HTML элемент контейнер для карточек главной страницы

- cardsMainGallery: HTMLElement[] = [] - Харнит массив HTML элементов карточек главной страницы. Инициализируется пустым массивом

Методы класса:

- set basketCounter(value: string) - Свойство-сеттер устанавливает текстовое значение счетчика количества элементов в корзине

- setGallaryItem(value: HTMLElement) - Метод добавляет HTML элемент в массив HTML элементов карточек свойства cardsMainGallery

- setGallaryPage() - Метод добавляет карточки на страницу

### Отображение карточек

3.  Класс CardUI  
    Класс расширяет компонент Component<Card>, cooтветствует типу Card. CardUI это родительский класс хранящий в себе поля с элементами карточек страницы и поле с id, предназначен для создания HTML элемента карточки. Конструктор класса вызывается в дочених компонентах CardPageUI и CardBasketUI, инициализирует общие HTML элементы карточки, в параметрах принимает HTML элемент карточки. С помощью метода render из родительского компонента Component<Card> в классе изменяются поля через сеттеры.

Свойства класса:

- categoryElement: HTMLSpanElement - HTML элемент с категорией товара

- titleElement: HTMLElement - HTML элемент с названием карточки

- imageElement: HTMLImageElement - HTML элемент с картинкой карточки

- priceElement: HTMLSpanElement - HTML элемент с ценой товара в карточке

- descriptionElement: HTMLParagraphElement - HTML элемент с описанием товара карточки

- idCard: string - id карточки

Методы класса:

- set category(value: string) - Свойство-сеттер устанавливает текстовое значение HTML элемента в поле categoryElement. В зависимости от переданного значения, переключает класса элементу с помощью метода toggleClass

- set title(value: string) - Свойство-сеттер устанавливает текстовое значение HTML элемента в поле titleElement

- set image(value: string) - Свойство-сеттер устанавливает значение атрибута src в поле imageElement

- set price(value: string) - Свойство-сеттер устанавливает текстовое значение HTML элемента priceElement

- set description(value: string) - Свойство-сеттер устанавливает текстовое значение HTML элемента descriptionElement

- set id(value: string) - Свойство-сеттер устанавливает значение поля idCard

4.  Класс CardPageUI  
    Класс отвечает за создание разметки карточки для главной страницы. Экземпляр класса создается для каждого объекта карточки полученного с сервера с помощью класса Api, по возникновению события "загрузки страницы". Событие вызывается методом setData компонента CardModel.  
    Конструктор класса инициализирует поля categoryElement и imageElement родительского класса CardUI, и вешает слушатель клика на карточку, в параметрах принимается шаблон карточки и брокер событий. В коллбэке слушателя вызывается событие "клика по карточке" с передачей в него объекта по типу { id: value }, в качестве значения value передается значение поля idCard родителя. Компонент пользуется полями и методами родителя CardUI поэтому при вызове метода render и передаче в него объекта карточки получаем готовую разметку карточки для главной страницы, которую кладем в метод setGallaryItem класса PageUI.  
    Компонент не имеет собственных полей и методов.

5.  Класс CardFullUI  
    Класс отвечает за создание HTML элемента увеличенной карточки. Экземпляр класса создается при возникновении события "нажатие на карточку" на главной странице. Конструктор принимает параметром шаблон карточки и брокер событий, вызывает родительский конструктор и передает в него HTML элемент карточки.  
    Конструктор вешает слушатель клика на кнопку "в корзину". В коллбэке слушателя вызывается событие "клик добавить в корзину" с передачей в него объекта по типу { id: value }, в качестве значения value передается значение поля idCard родителя. Рендер элемента карточки для увеличенного просмотра происходит с помощью метода render который наследуется от Component<Card> и возвращает готовую разметку для вставки в DOM.  
    Готовый элемент разметки передается в метод setContent класса Popap.

Свойства класса:

- buttonInBasketElement: HTMLButtonElement - HTML элемент кнопка - "добавить в корзину"

6. Класс CardBasketUI  
   Компонент отвечает за создание карточки для корзины и соответствует интерфейсу ICardBasketUI. Конструктор класса принимает шаблон элемента карточки и брокер событий. В конструкторе инициализируются поля itemIndexElement и itemDeleteButton и вешается слушатель на кнопку "удалить карточку из корзины". В коллбэке слушателя вызывается событие "удалить карточку из корзины" с передачей в него объекта по типу { id: value }, в качестве значения value передается значение поля idCard родителя. При вызове медода render у данного класса, дополнительно передается объект с полем itemIndex.  
   Экземпляр класса создается при возникновении события "изменение списка корзины", для каждого объекта карточки полученного из метода getProductList класса basketModel.

Свойства класса:

- itemIndexElement: HTMLSpanElement - Индекс элемента в корзине

- itemDeleteButton: HTMLButtonElement - Кнопка удаления карточки

Методы класса:

- set itemIndex(value: string) - Свойство-сеттер устанавливает текстовое значение HTML элемента в поле itemIndexElement

### Отображение корзины

7. Класс BasketUI  
   Компонент отвечает за отображение элементов корзины в модальном окне. Конструктор принимает шаблон элементов корзины и брокер событий. Инициализирует поля totalPriceElement, basketButton, basketList и вешает слушатель клика на кнопку "оформить". В коллбэке слушателя клика вызывается событие "отправка списка корзины"
   Класс расширяет абстрактный класс Component<IBasketUI> и соответствует интерфейсу IBasketUI.
   Экземпляр класса создается при загрузке страницы

Свойства класса:

- totalPriceElement: HTMLElement - HTML элемент суммы корзины

- basketButton: HTMLButtonElement - Кнопка "оформить" в корзине

- basketList: HTMLElement - HTML контейнер для элементов корзины

Методы класса:

- totalPrice(value: string) - свойство-сеттер устанавливает текстовое значение для totalPriceElement

- itemsBasketBoolean(value: boolean) - свойство-сеттер устанавливает значение Disabled для кнопки basketButton. Принимает булево значение

- basketItems(value: HTMLElement[]) - свойство-сеттер помещает HTML элементы в список basketList. Принимает массив HTML элементов

### Отображение форм

8. Класс FormUI  
   Компонент является абстрактным классом и родительским для компонентов форм. Конструктор класса принимает в параметрах шаблон формы и инициализирует общие свойства форм.

9. Класс PaymentUI  
   Компонент расширяет FormUI и соответсвует интерфейсу IPayment.  
   Компонент предназначен для создания разметки формы выбора оплаты. Конструктор класса принимат шаблон HTML элемента и брокер событий, инициализирует поля и вешает слушатели: клика на кнопки вариантов оплаты, слушатель ввода на инпут адреса, слушатель сабмит на форму.
   В коллбэках слушателей вызываются события "клик выбор оплаты", "клик ввод адреса", и "клик отправка формы"

Свойства класса:

- cardButton: HTMLButtonElement - HTML элемент кнопка "оплата онлайн"

- cashButton: HTMLButtonElement - HTML элемент кнопка "оплата наличными"

- addressInput: HTMLInputElement - HTML элемент инпут адреса

Методы класса:

- address(value: InputSettings) - свойство-сеттер устанавливает значение required для HTML элемента инпут адреса. Принимает параметром значение по типу InputSettings

10. Класс ContactUI  
    Компонент расширяет FormUI и соответсвует интерфейсу IContactUI. Компонент предназначен для создания разметки формы контактных данных. Конструктор класса принимат шаблон HTML элемента и брокер событий, инициализирует поля и вешает слушатели ввода данных и отправки формы на саму форму. В коллбэках слушателей вызываются событий "ввод контактов" и "отправка контактов".
    Полученный с помощью метода render элемент разметки добавляется в DOM с помощью метода setContent класса popup.

Свойства класса:

- inputTelElement: HTMLInputElement - HTML элемент инпут номера телефона

- inputEmailElement: HTMLInputElement - HTML элемент инпут email

Методы класса:

- email(value: InputSettings) - свойство-сеттер устанавливает значение required и атрибута тип email для inputEmailElement. Параметром принимает объект с настройками для инпутов по типу InputSettings

- tel(value: InputSettings) - свойство-сеттер устанавливает значение required, атрибут тип и атрибут pattern. Принимает на вход параметр типа InputSettings

### Отображение успешной оплаты

11. Класс SuccessUI  
    Компонент расширяет базовый Component<Success> и соответсвует интерфейсу Success. Компонент предназначен для создания разметки окна успошной покупки. Конструктор класса принимат шаблон HTML элемента и брокер событий, инициализирует поля и вешает слушатель клика на кнопку "Вперед за новыми покупками". В коллбэке вызывается событие "клик по кнопке закрыть окна успешной оплаты". Полученный с помощью метода render элемент разметки добавляется в DOM с помощью метода setContent класса popup.

Свойства класса:

- totalPriceElement: HTMLParagraphElement - HTML элемент с текстом общей суммы покупки

- orderSuccessCloseElement: HTMLButtonElement - HTML элемент кнопка "Вперед за новыми покупками"

Методы класса:

- total(value: number) - свойство-сеттер устанавливает текстовое значение для HTML элемента в свойстве totalPriceElement

## Типы данных
```
type Card = {
id: string;
description: string;
image: string;
title: string;
category: string;
price: number | null;
};

interface IUserDataModel {
setIdItems(value: string[]): void
setPayment(value: string): void
setAddress(value: string): void
setPhone(value: string): void
setEmail(value: string): void
setTotal(value: string | number | null): void
checkPayment(): boolean
clearProperty(): void
}

interface ICard {
total: number;
cards: Card[];
getDataAllCards(): Card[];
getDataCard(id: string): Card;
getDataCardToBasket(id: string): Partial<Card>;
setData(res: ApiListResponse<Card>): void;
}

interface IBasketModel {
addProduct(obj: Card): void;
delProduct(id: string): void;
getProductList(): Card[];
setElements(value: HTMLElement[]): void;
checkItems(): boolean
clear(): void;
total: string;
totalItems: string;
elements: HTMLElement[];
}

interface IPopup {
closePopup(): void;
openPopup(): void;
clearContentPopup(): void;
setContent(value: HTMLElement): void;
}

interface IPageUI {
basketCounter: string;
setGallaryItem(value: HTMLElement): void;
setGallaryPage(): void;
}

interface ICardBasketUI extends Card {
itemIndex: string;
}

interface IBasketUI {
totalPrice: string;
itemsBasketBoolean: boolean;
basketItems: HTMLElement[];
}

interface IPayment {
address: InputSettings
}

interface IContactUI {
email: InputSettings,
tel: InputSettings
}

type InputSettings = {
required: boolean;
typeTel: string;
typeEmail: string;
pattern: string;
};

type InputSetting = {
address: Partial<InputSettings>;
tel: Partial<InputSettings>;
email: Partial<InputSettings>;
};

interface Success {
total: number;
}
```

type ResponseApiPost = Success & { id: Pick<Card, `id`> };

## Краткое описание работы приложения

В приложении используется событийно-ориентированный метод написания кода. За основу архитектуры приложения взят паттерн MVP. В проекте вынесены в отдельные файлы, в папке component, сущности отвечающие за работу конкретных элементов приложения. Все файлы разделены на компоненты отображения и компоненты модели данных. Название файлов отражают принадлежность компонента к определнной группе.
В корневом index.ts располагается основной код проекта, он же и является Present из модели MVP.
Типы данных и интерфейсы вынесены папку types.
