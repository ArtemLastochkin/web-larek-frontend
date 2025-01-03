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

## Краткое описание приложения

В приложении используется событийно-ориентированный метод написания кода. За основу архитектуры приложения взят паттерн MVP. В проекте вынесены в отдельные файлы, в папке component, сущности отвечающие за работу конкретных элементов приложения. Все файлы разделены на компоненты отображения и компоненты модели данных. Название файлов отражают принадлежность компонента к определнной группе.
Компоненты Model - хранят в себе данные и предоставляют методы для получения, изменения этих данных.
Компоненты UI - предназначены для сборки HTML элементов по шаблону и предоставляют методы для работы с разметкой.  
В корневом index.ts располагается основной код проекта, он же и является Present из модели MVP.
Типы данных и интерфейсы вынесены папку types.  
Основные настройки приложения находятся в файле constants папки utils.  
В приложении используются утилиты собранные в файле utils.

## Об архитектуре

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

## Базовый код

1. Класс EventEmitter  
   Позволяет подписываться на события и уведомлять подписчиков о наступлении события.
   Класс имеет методы on , off , emit — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно.
   Дополнительно реализованы методы onAll и offAll — для подписки на все события и сброса всех подписчиков.
   Класс написан по интерфейсу IEvents.
   Конструктор не принимает параметром и инициализирует свойство \_events.
   Интересным дополнением является метод trigger , генерирующий заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы.
   Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter. Экземпляр создается при загрузке страницы.

- on<T extends object>(event: EventName, callback: (data: T) => void): void; - метод обрабатывает событие event. На вход принимает event - название события, callback - функцию обработчик. Входные параметры в функции обработчике имеют дженерик тип

- emit<T extends object>(event: string, data?: T): void; - метод вызывает событиие с названием event. На вход принимает параметры event - нвазвание события строкой, data - опционально может принимать объект с дженерик типом который расширяет object.

- trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void; - метод позволяет генерировать событие. Параметры: event - название события строка, context - опционально объект с настройками, расширяет object. Вызовм метода возвращает функцию коллбэк с параметром data по типу object.

- onAll(callback: (event: EmitterEvent) => void) - метод позволяет установить слушатель на все события. В параметрах принимет объект по типу EmitterEvent

- offAll() - метод сбрасывает всех обработчки событий

2. Класс Api
   Предназначен для получения данных и отправки на сервер.
   Конструктор класса constructor(baseUrl: string, options: RequestInit = {}) - принимает базовый URL baseUrl в виде строки и options - глобальные опции для всех запросов(опционально) в виде объекта по типу RequestInit, изначально инициализирован как пустой объект.
   Вызов нового экземпляра класса инициализирует поля baseUrl и options.

Свойства класса:

- baseUrl - Строка с базовым URL

- options: RequestInit - хранит глобальные настройки по типу RequestInit

Методы класса:

- handleResponse(response: Response): Promise - метод обрабатывает ответ с сервера с помощью json и возвращает промис. В параметрах принимает объект типа Response.

- get(uri: string) - метод возвращает результат fetch запроса GET отправленный по адресу baseUrl + uri где uri строка и обработанный с помощью handleResponse. В параметрах принимает агрумент строку.

- post(uri: string, data: object, method: ApiPostMethods = 'POST') - метод возвращает результат fetch запроса методом ApiPostMethods, отправленный по адресу baseUrl + uri где uri строка, и обработанный с помощью handleResponse. На вход метод принимат uri - строка, data - объект с настройками, method - метод запроса, изначально инициализирован как строка 'POST'

3. Класс Component  
   Абстрактный класс, является общим для классов отображения.
   Конструктор constructor(protected readonly container: HTMLElement) - Принимает параметром шаблон HTML элемента и вызывается в конструкторах дочерних классов.
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

1. Класс CardModel  
   Класс хранит данные полученные с сервера и предоставляет публичные методы для работы с данными карточек.  
   Конструктор класса constructor(protected eventEmitter: IEvents) {} - принимает параметром брокер событий для дальнейшего использования в методах класса. Создание нового экземпляра класса предоставляет доступ к его методам. Экземпляр создается при загрузке страницы.

Свойства объекта:

- total: number - Общее количество карточек

- cards: Card[] - Массив с объектами карточек

Методы класса:

- getDataAllCards(): Card[] - Возвращает массив с объектами карточек

- getDataCard(id: string): Card - Возвращает объект карточки с переданным в параметре id

- getDataCardToBasket(id: string): Partial<Card> - Возвращает объект карточки, с переданным в параметре id, состоящий из двух полей в виде { title, price }

- setData(res: ApiListResponse<Card>) - Сохраняет данные в классе. Получает в параеметре объект по типу ApiListResponse<Card> от сервера. Вызывает события "загрузки страницы" и "изненение списка корзины"

2. Класс BasketModel  
   Корзина это список товаров которые пользователь хочет купить. Класс хранит в себе массивы с объектами и HTML элементами карточек и соответствует интерфейсу IBasketModel. Изменение списка товаров и получение необходимой информации о корзине возможно с помощью методов класса.  
   Конструктор класса constructor(protected events: IEvents) {} - принимает параметром брокер событий для дальнейшего использования в методах класса. Создание нового экземпляра класса предоставляет доступ к его методам. Экземпляр создается при загрузке страницы.

Свойства класса:

- cardList: Card[] - Массив с объектами карточек

- cardElements: HTMLElement[] - Массив с HTML элементами карточек

Методы класса:

- setElements(value: HTMLElement[]) - Записывает переданной значение в свойство cardElements. Принимает на вход массив HTML элементов

- addProduct(obj: Card): void - Добавляет объект в свойство cardList, при условии что такого объекта в свойстве еще нет. Вызывает событие изменение списка карточек в корзине

- delProduct(id: string) - Удаляет карточку из свойства cardList. Вызывает событие изменение списка карточек в корзине

- getProductList(): Card[] - Возвращает массив с объектами карточек из свойства cardList

- checkItems(): boolean - Вызов метода проверяет наличие элементов в корзине и возвращает true = корзина пуста, false = корзина не пуста

- clear():void - Метод очищает корзину. Вызывает событие изменение списка карточек в корзине

- get total(): string - геттер возвращает общую стоимость всех элементов корзины в виде строки

- get totalItems(): string - свойство-геттер возвращает общее количество элементов корзины в виде строки

- get elements(): HTMLElement[] - свойство-геттер возвращает массив HTML элементов корзины

3. Класс UserDataModel  
   Компонент хранит в себе данные результата взаимодействия пользователя с приложением и предоставляет методы для работы с ними, соответствует интерфейсу IUserDataModel.
   Конструктор класса constructor() {} - не принимает параметров и не выполняет никакх действий.
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

1. Класс Popup  
   Компонент хранит HTML элементы - модального окна и его элементов, отвечает за показ и скрытие модального окна, а также устанавливает слушатель события на кнопку закрытия и оверлей модального окна. Класс соответствует интерфейсу IPopup.  
   Конструктор класса constructor(modalContainer: HTMLElement, eventEmitter: IEvents) - принимает modalContainer - HTML элемент модального окна и eventEmitter - брокер событий по типу IEvents. Создание нового экземпляра класса предоставляет доступ к его методам, инициализирует свойства класса и вешает слушатели событий на элементы. Экземпляр создается при загрузке страницы.

Свойства класса:

- modalContent: HTMLElement - HTML элемент контента в модальном окне

- modalContainer: HTMLElement - Модальное окно

- modalCloseButton: HTMLButtonElement - Кнопка закрытия модального окна

Методы класса:

- closePopup() - Закрывает модальное окно

- openPopup() - Открывает модальное окно

- clearContentPopup() - Очищает весь контент внутри модального окна

- setContent(value: HTMLElement) - Заполняет контент внутри модального окна. В параметрах принимает HTML разметку

- closePopupEsc = (evt: KeyboardEvent) => void - метод-обработчик, по нажатию Escape закрывает модальное окно

2. Класс PageUI  
   Компонент отвечает за отображение элементов главной страницы.  
   Конструктор класса constructor(protected page: HTMLElement, event: IEvents) - принимает параметром page - тело страницы HTMLElement и event - брокер событий по типу IEvents. Создание экземпляра класса происходит при загрузке страницы и вызывает родительский конструктор super(page), а также инициализирует свойства класса, вешает слушатель на кнопку корзины. Класс соответствует интерфейсу IPageUI. Класс расширяет компонент Component<IPageUI>

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

3. Класс CardUI  
   Класс расширяет компонент Component<Card>, cooтветствует интерфейсу Card. CardUI это родительский класс хранящий в себе поля с элементами карточек страницы и поле с id, предназначен для создания HTML элемента карточки.  
   Конструктор класса constructor(container: HTMLElement) - вызывается в дочених компонентах CardPageUI и CardBasketUI, инициализирует общие HTML элементы карточки, в параметрах принимает container - HTML элемент карточки. С помощью метода render из родительского компонента Component<Card> в классе изменяются поля через сеттеры.

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

4. Класс CardPageUI  
   Класс отвечает за создание разметки карточки для главной страницы. Экземпляр класса создается для каждого объекта карточки полученного с сервера с помощью класса Api, по возникновению события "загрузки страницы". Событие вызывается методом setData компонента CardModel.  
   Конструктор класса constructor(container: HTMLElement, events: IEvents) - вызывает конструктор родителя super(container), инициализирует поля categoryElement и imageElement родительского класса CardUI, и вешает слушатель клика на карточку, в параметрах принимается container - шаблон карточки c типом HTMLTemplateElement и events - брокер событий с типом IEvents. В коллбэке слушателя вызывается событие "клика по карточке" с передачей в него объекта по типу { id: value }, в качестве значения value передается значение поля idCard родителя. Компонент пользуется полями и методами родителя CardUI поэтому при вызове метода render и передаче в него объекта карточки получаем готовую разметку карточки для главной страницы, которую кладем в метод setGallaryItem класса PageUI.  
   Компонент не имеет собственных полей и методов.

5. Класс CardFullUI  
   Класс отвечает за создание HTML элемента увеличенной карточки. Экземпляр класса создается при возникновении события "нажатие на карточку" на главной странице.  
   Конструктор constructor(container: HTMLTemplateElement, events: IEvents) - принимает параметром container - шаблон карточки по типу HTMLTemplateElementи, events - брокер событий по типу IEvents, вызывает родительский конструктор super(container, events), класса CardPageUI и передает в него HTML элемент карточки и брокер событий.  
   Конструктор вешает слушатель клика на кнопку "в корзину". В коллбэке слушателя вызывается событие "клик добавить в корзину" с передачей в него объекта по типу { id: value }, в качестве значения value передается значение поля idCard родителя. Рендер элемента карточки для увеличенного просмотра происходит с помощью метода render который наследуется от Component<Card> и возвращает готовую разметку для вставки в DOM.  
   Готовый элемент разметки передается в метод setContent класса Popap.

Свойства класса:

- buttonInBasketElement: HTMLButtonElement - HTML элемент кнопка - "добавить в корзину"

Метода класса:

- changeActivityButtonInBasket(value: boolean): void - метод изменяет значение Disabled у кнопки "в корзину"

6. Класс CardBasketUI  
   Компонент отвечает за создание карточки для корзины и соответствует интерфейсу ICardBasketUI.  
   Конструктор класса constructor(container: HTMLTemplateElement, events: IEvents) - принимает container - шаблон элемента карточки по типу HTMLTemplateElement и events - брокер событий по типу IEvents. В конструкторе инициализируются поля itemIndexElement и itemDeleteButton и вешается слушатель на кнопку "удалить карточку из корзины". В коллбэке слушателя вызывается событие "удалить карточку из корзины" с передачей в него объекта по типу { id: value }, в качестве значения value передается значение поля idCard родителя. При вызове медода render у данного класса, дополнительно передается объект с полем itemIndex.  
   Экземпляр класса создается при возникновении события "изменение списка корзины", для каждого объекта карточки полученного из метода getProductList класса basketModel.

Свойства класса:

- itemIndexElement: HTMLSpanElement - Индекс элемента в корзине

- itemDeleteButton: HTMLButtonElement - Кнопка удаления карточки

Методы класса:

- set itemIndex(value: string) - Свойство-сеттер устанавливает текстовое значение HTML элемента в поле itemIndexElement

### Отображение корзины

7. Класс BasketUI  
   Компонент отвечает за отображение элементов корзины в модальном окне.  
   Конструктор constructor(container: HTMLTemplateElement, event: IEvents) - принимает в параметрах container по типу HTMLTemplateElement - шаблон элементов корзины и event - брокер событий по типу IEvents. Инициализирует поля totalPriceElement, basketButton, basketList и вешает слушатель клика на кнопку "оформить". В коллбэке слушателя клика вызывается событие "отправка списка корзины"
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
   Компонент является абстрактным классом и родительским для компонентов форм.
   Конструктор класса constructor(protected container: HTMLFormElement, protected events: IEvents) - принимает в параметрах container - шаблон формы по типу HTMLFormElement и events - брокер событий по типу IEvents, инициализирует общие свойства форм errorElement и submitButton, а также вешает универсальный слушатель ввода и сабмит на форму.
   Класс расширяет родительский Component<InputSetting>.

Свойства класса:

- errorElement: HTMLSpanElement; - HTML элемент с текстом ошибки

- submitButton: HTMLButtonElement; - HTML элемент кнопки submit формы

Методы класса:

- changeActivitySubmit: = (value: boolean = true) => void - метод изменяет атрибут Disabled у кнопки submit формы, принимает в параметр булево значение, значение инициализировано изначально true - Disabled активен

- changeTextError = (value: string = ``) => void - метод изменяет текст ошибки валидации формы, изначально инициализирован пустой строкой, принимает на вход строку

- onInputChange(nameInp: string, input: HTMLInputElement, form: HTMLFormElement): void - метод принимает на вход параметры nameInp - значение атрибута name инпута в котором происходит ввод текста с типом string, input - сам инпут в который вводится текст с типом HTMLInputElement, form - форму в которой происходит событие ввода с типом HTMLFormElement.  
  Метод вызывает событие по универсальному названию которое состоит из значения атрибута name контейнера, точки, значения атрибута name инпута в который происходит ввод и добавочной строки :change.

9. Класс PaymentUI  
   Компонент расширяет FormUI и соответсвует интерфейсу IPayment.  
   Компонент предназначен для создания разметки формы выбора оплаты.  
   Конструктор класса constructor(container: HTMLFormElement, event: IEvents) принимает container - шаблон HTML элемента с типом HTMLFormElement и event - брокер событий с типом IEvents, вызывает родительский конструктор super(container, event); инициализирует поля и вешает слушатели клика на кнопки вариантов оплаты.
   В коллбэках слушателей вызывается событие "клик выбор оплаты". В событие передается объект с полями: payment - строка online или offline, buttonClick - кнопка по которой произошел клик, otherButton - кнопка по которой не произошел клик, changeTextError - метод родителя для изменения текста ошибки, methodToggleClass - метод родителя для переключения класса элементов, changeActivitySubmit - методо родителя для изменения активности кнопки submit всей формы.

Свойства класса:

- cardButton: HTMLButtonElement - HTML элемент кнопка "оплата онлайн"

- cashButton: HTMLButtonElement - HTML элемент кнопка "оплата наличными"

- addressInput: HTMLInputElement - HTML элемент инпут адреса

Методы класса:

- address(value: InputSettings) - свойство-сеттер устанавливает значение required для HTML элемента инпут адреса. Принимает параметром значение по типу InputSettings

10. Класс ContactUI  
    Компонент расширяет FormUI и соответсвует интерфейсу IContactUI. Компонент предназначен для создания разметки формы контактных данных.  
    Конструктор класса constructor(container: HTMLFormElement, event: IEvents) - принимат container - шаблон HTML элемента по типу HTMLFormElement и event - брокер событий по типу IEvents, вызывает родительский конструктор super(container, event); инициализирует поля.
    Полученный с помощью метода render элемент разметки добавляется в DOM с помощью метода setContent класса popup.

Свойства класса:

- inputTelElement: HTMLInputElement - HTML элемент инпут номера телефона

- inputEmailElement: HTMLInputElement - HTML элемент инпут email

Методы класса:

- email(value: InputSettings) - свойство-сеттер устанавливает значение required и атрибута тип email для inputEmailElement. Параметром принимает объект с настройками для инпутов по типу InputSettings

- tel(value: InputSettings) - свойство-сеттер устанавливает значение required, атрибут тип и атрибут pattern. Принимает на вход параметр типа InputSettings

### Отображение успешной оплаты

11. Класс SuccessUI  
    Компонент расширяет базовый Component<Success> и соответсвует интерфейсу Success. Компонент предназначен для создания разметки окна успошной покупки.  
    Конструктор класса constructor(container: HTMLTemplateElement, event: IEvents) - принимат container - шаблон HTML элемента с типом HTMLTemplateElement и event - брокер событий с типом IEvents, инициализирует поля и вешает слушатель клика на кнопку "Вперед за новыми покупками". В коллбэке вызывается событие "закрыть Popup". Полученный с помощью метода render элемент разметки добавляется в DOM с помощью метода setContent класса popup.

Свойства класса:

- totalPriceElement: HTMLParagraphElement - HTML элемент с текстом общей суммы покупки

- orderSuccessCloseElement: HTMLButtonElement - HTML элемент кнопка "Вперед за новыми покупками"

Методы класса:

- total(value: number) - свойство-сеттер устанавливает текстовое значение для HTML элемента в свойстве totalPriceElement. Принимает на вход один параметр с типом Number

## Типы данных

1. Тип данных карточки является основным типом в приложении

```
type Card = {
id: string;
description: string;
image: string;
title: string;
category: string;
price: number | null;
};
```

2. Интерфейс описывает класс UserDataModel

```
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
```

3. Интерфейс описывает класс CardModel

```
interface ICard {
total: number;
cards: Card[];
getDataAllCards(): Card[];
getDataCard(id: string): Card;
getDataCardToBasket(id: string): Partial<Card>;
setData(res: ApiListResponse<Card>): void;
}
```

4. Интерфейс описывает класс BasketModel

```
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
```

5. Интерфейс описывает класс Popup

```
interface IPopup {
closePopup(): void;
openPopup(): void;
clearContentPopup(): void;
setContent(value: HTMLElement): void;
}
```

6. Интерфейс описывает класс PageUI

```
interface IPageUI {
basketCounter: string;
setGallaryItem(value: HTMLElement): void;
setGallaryPage(): void;
}
```

7. Интерфейс описывает класс CardBasketUI

```
interface ICardBasketUI extends Card {
itemIndex: string;
}
```

8. Интерфейс описывает класс CardFullUI

```
interface ICardFullUI extends Card {
changeActivityButtonInBasket(value: boolean): void; - метод добавляет или убирает Disabled на кнопку "добавить в корзину"
}
```

9. Интерфейс описывает класс BasketUI

```
interface IBasketUI {
totalPrice: string;
itemsBasketBoolean: boolean;
basketItems: HTMLElement[];
}
```

10. Интерфейс описывает класс PaymentUI

```
interface IPayment {
address: InputSettings
}
```

11. Интерфейс описывает класс ContactUI

```
interface IContactUI {
email: InputSettings,
tel: InputSettings
}
```

12. Тип описывает объект настроек для инпутов

```
type InputSettings = {
required: boolean; - Значение атрибута required
typeTel: string; - Значение атрибута name
typeEmail: string; - Значение атрибута name
pattern: string; - Регулярное выражение
};
```

13. Тип описывает настройки для инпутов

```
type InputSetting = {
address: Partial<InputSettings>; - Настройки для инпута адреса
tel: Partial<InputSettings>; - Настройки для инпута телефона
email: Partial<InputSettings>; - Настройки для инпута email
};
```

14. Интерфейс описывает класс Success

```
interface Success {
total: number;
}
```

15. Тип описывает объект полученный от сервера после отправки данных пользователя

```
type ResponseApiPost = Success & { id: Pick<Card, `id`> };
```

16. Константы событий

```
enum EventsName {
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
	ContactsSubmit = `contacts:submit`
}
```

### События приложения

1. loaded:page  
   Вызывается изменением данных в CardModel с помощью метода setData.  
   Создается разметка карточек с помощью CardPageUI и используя метод setGallaryPage класса PageUI добавляется на страницу.

2. card:click  
   Вызывается по клику на карточку. Создается разметка карточки по которой произошел клик для увеличенного отображения с помощью CardFullUI и добавляется в контейнер модального окна методом setContent класса popup с последующим открытием модального окна методом openPopup. После создания экземпляра класса CardFullUI, происходит проверка стоимости товара с помощью метода changeActivityButtonInBasket. При стоимости = 0, кнопка "добавить в корзину" в модальном окне большого просмотра карточки будет недоступна. Данные карточки берутся из модели по id методом getDataCard.

3. popup:close  
   Событие вызывается при клике по крестику или оверлею модального окна. Закрывает модальное окно и очищает весь контент в нем с помощью методов popup.closePopup и popup.clearContentPopup.

4. card:clickAddBasket  
   Вызывается при клике на кнопку "в корзину" в модальном окне увеличенного просмотра карточки.  
   С помощью метода модели корзины addProduct, записывается в модель.

5. basket:changeList  
   Вызывается в методах addProduct, delProduct, clear класса BasketModel.  
   С помощью класса PageUI и метода render отрисовывается новый счетчик на иконке корзины на главной странице приложения. С помощью сеттера itemsBasketBoolean класса BasketUI устанавливается значение disabled для кнопки "оформить".  
   Для каждого объекта в корзине создается разметка отображения с помощью CardBasketUI и готовые элементы разметки создаряются в модель корзины.

6. card:delItemBasket  
   Вызывается по нажатию на кнопке удаления элемента в корзине. Удаляется объект из модели данных корзины. С помощью геттера elements модели корзины получаем обновленный список элементов корзины и добавляем на страницу. В метод rendor передается обновленное значение суммы корзины и массив с элементами корзины. Сеттер basketItems в классе BasketUI получив массив элементов обновляет элементы в контейнере с помощью метода replaceChildren.

7. headerBasketButton:click  
   Событие клик по ярлыку корзины на главной странице.  
   Из модели запрашиваются элементы корзины с помощью геттера elements и создается заного разметка для каждого элемента. Готовые элементы добавляются в модальное окно с помощью метода setContent и открывается модальное окно с помощью openPopup.  
   Происходит очистка объекта данных пользователя методом clearProperty класса UserDataModel.

8. basket:sendList  
   Событие вызывается по клику на кнопку "оформить" в модальном окне корзины. Методом getProductList получаем все объекты на данный момент в корзине и создаем новый массив из id объектов карточек. Массив добавляем в UserDataModel с помощью метода setIdItems.  
   Создается новая разметка формы оплаты с помощью класса PaymentUI.
   Записываем сумму корзины в UserDataModel с помощью метода setTotal.  
   Готовую разметку вставляем в модальное окно с помощью метода setContent класса popup.

9. order.address:change  
   Возникает при вводе данных в инпут с адресом. В событии описана валидация при которой поле адреса обязательно к заполнению.  
   В классе UserDataModel с помощью метода checkPayment проверяется выбран ли тип оплаты.  
   В зависимости от валидности инпута и наличия выбранного вида оплаты разблокируется кнопка далее модального окна оплаты.

10. payment:click  
    Событие клика по кнопкам вида оплаты. Клик по любой кнопке отправляет строку с видом оплаты в UserDataModel с помощью метода setPayment. В событиии происходит валидация которая определяет какая кнопка нажата и нажата ли вообще.

11. order:submit  
    Событие клика по кнопке "далее" в модальном окне выбора оплаты создает новую разметку с помощью экземпляра ContactUI и отрисовывает ее с помощью setContent класса popup.
    При создании разметки окна контактных данных в render передаются настроки для будущих инпутов email и phone.

12. contacts.email:change
    Событие ввода email отправляет данные методом setEmail в модель UserDataModel.
    При успешной валидации разблокируется кнопка "оплатить" модального окна. При валидации используется встроенный метод checkValidity.

13. contacts.phone:change
    Ввод номера телефона отправляет данные методом setPhone в модель UserDataModel.Для валидации инпута с номером телефона используется регулярное выражение: ^[+][7] \?[ 0-9]\*$

14. contacts:submit  
    Клик по кнопке оплатить отправляет объект userDataModel в запросе на сервер с помощь базового класса Api.  
    При успешной отправле данных на сервер происходит очистка корзины методом clear и создается новая разметка экземпляром класса SuccessUI, далее метод render передается объект по типу ResponseApiPost и готовую разметку добавляем в модальное окно с помощью setContent.
