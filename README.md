## Установка

На машине должен быть установлен `Gulp.js` глобально. Если нет - выполнить `sudo npm install gulp -g`.
Для установки всех модулей воспользоваться командой `npm install`, и в паку установятся все необходимые модули. <br>

## Сборка

Для сборки есть несколько команд:<br>
* `gulp` (или `npm run dev`) - запускает сборку в режиме разработки. При этом минифицируются только стили. Скрипты не минифицируются.<br>
* `gulp production` (или `npm run prod`) - сборка такая же, но выполняется единажды и с минификацией js-кода.<br>

При начале новой сборки, из папки `dist` удаляются все html-файлы, чтобы не оставалось мусора. Если файл удалили из папки `html`, он не удалится из `dist` слету. Для этого надо перезапустить сборку.<br>

## Модули верстки
Изначально шаблон чистый, без модулей. Модули - это условное разделение на составные части всей верстки. Если нужен попап - подключить попап, если нужен слайдер - то слайдер. Залить скрипт и стили. <br>
Модули скачать отдельным архивом [modules.zip](http://dev.divisory.com/modules.zip) <br>
В комплекте уже есть [jQuery 1.11](https://jquery.com/), подключать извне не требуется <br>
В комплекте уже есть сетка [Flexbox Grid](http://flexboxgrid.com/). <br>

### Flexbox Grid
Это такая же сетка как сетка Bootstrap в плане классов, но сюда добавлен брейкпоинт на 480px: `.ms-*` <br>
Так же, под каждое разрешение есть набор классов чтобы показать или скрыть блок:
* `*-hide` - скрывает (.md-hide)
* `*-inline` - отображает как inline-элемент (.md-inline)
* `*-iblobk` - отображает как inline-block-элемент (.md-iblock)
* `*-show` - отображает как блочный элемент (.md-show)

##### Валидация форм
По умолчанию все формы валидируются на заполненость. Если есть ошибки, то для .form-group выставится класс .error<br>
Валидируются формы с классом `.validate-form`<br>
`coffee/init/validation.coffee`

##### jQuery Mousewheel
`js/plugins/jquery.mousewheel.min.js`<br>
Плагин для кроссбраузерного отслеживания событий колесика мышки<br>
[Repo](https://github.com/jquery/jquery-mousewheel)

##### jQuery Easing Funcitons
Функции плавности для анимаций<br>
`js/plugins/jquery.easing.min.js`<br>
[Demos](http://easings.net/ru)

##### jQuery Maskedinput
Маска для ввода телефона (чаще всего) или любого другого типа данных (число, дата, т.д.)
`coffee/init/mask.coffee`<br>
`js/plugins/jquery.maskedinput.min.js`<br>
[Demo](http://digitalbush.com/projects/masked-input-plugin/) | [Repo](https://github.com/digitalBush/jquery.maskedinput)

##### Owl Carousel
Карусель, слайдер<br>
`scss/components/owl.scss`<br>
`js/plugins/owl.carousel.min.js`<br>
[Page, demo](https://owlcarousel2.github.io/OwlCarousel2/) | [Documantation](https://owlcarousel2.github.io/OwlCarousel2/docs/started-welcome.html)

##### Magnific Popup
Попап для галереи фотографий, аналог - [Lightbox](http://lokeshdhakar.com/projects/lightbox2/)<br>
`js/plugins/jquery.magnific-popup.min.js`<br>
`css/magnific-popup.css`<br>
[Page](http://dimsemenov.com/plugins/magnific-popup/) | [Repo](https://github.com/dimsemenov/Magnific-Popup)

##### Packery
Плиточная раслкдка блоков на странице<br>
`js/plugins/packery.pkgd.min.js`<br>
[Page](http://packery.metafizzy.co/) | [Layout](http://packery.metafizzy.co/layout.html) | [Options](http://packery.metafizzy.co/options.html)

##### Fullpage
Плагин для поэкранного скроллинга<br>
`js/plugins/jquery.fullPage.min.js`<br>
`css/jquery.fullpage.min.css`<br>
[Page](http://alvarotrigo.com/fullPage/) | [Documanetation](https://github.com/alvarotrigo/fullPage.js#fullpagejs)

##### Perfect Scrollbar
Кастомный скроллбар, как альтернатива - [jScrollPane](http://jscrollpane.kelvinluck.com/)
`js/plugins/perfect-scrollbar.jquery.min.js`<br>
`css/perfect-scrollbar.min.css`<br>
[Demo](http://noraesae.github.io/perfect-scrollbar/) | [Repo](https://github.com/noraesae/perfect-scrollbar)

##### The Final Countdown
Счетчик времени до какого-то события<br>
`js/plugins/jquery.countdown.min.js`<br>
[Page](http://hilios.github.io/jQuery.countdown/) | [Documentation](http://hilios.github.io/jQuery.countdown/documentation.html) | [Examples](http://hilios.github.io/jQuery.countdown/examples.html)

##### Select2
Кастомные селекты<br>
`js/plugins/select2.min.js`<br>
`css/select2.min.css`<br>
[Page](https://select2.github.io/) | [Demos](https://select2.github.io/examples.html)

##### noUIslider
Range-слайдер<br>
`js/plugins/nouislider.min.js`<br>
`css/nouislider.css`<br>
[Page](https://refreshless.com/nouislider/) | [Demos](https://refreshless.com/nouislider/examples/)

##### Google maps
Карты Google<br>
`https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyClwL3uSzQALQ9tgO1iN9WNoN4vJ_kZeh4`<br>
`coffee/init/google-maps.coffee`<br>
[API](https://developers.google.com/maps/documentation/javascript/?hl=ru) | [Custom styles](https://snazzymaps.com/)

##### Yandex Maps
Яндекс карты<br>
`https://api-maps.yandex.ru/2.1/?lang=ru_RU`<br>
`coffee/init/yandex-maps.coffee`<br>
[API](https://tech.yandex.ru/maps/)

##### Vue.js
Фреймворк, использующий паттерн MVVM<br>
`js/plugins/vue.min.js`<br>
[Page](https://vuejs.org/) | [Examples](https://vuejs.org/v2/examples/) | [API](https://vuejs.org/v2/api/) | [Component](https://vuejs.org/v2/api/#Vue-component)

## А так же, наработки без категорий
##### Range slider (Инициализация noUIslider)
Скрипт заточен под 2 якоря, а так же под вод с инпутов<br>
`coffee/init/range-slider.coffee`

##### Utils
Библиотека с маленькими утилитами. <br>
`coffee/init/utils.coffee`

##### Попапы
Попапы на основе инлайн-блоков для выравнивания.<br>
Есть возможность вызвать попап глобально на странице с помощью<br>
```
callPopup('#myPopupId');
```
`coffee/init/popup.coffee`<br>
`scss/components/popup.scss`

##### Вспылвающие оповещения в стиле оповещения ОС
`coffee/init/notify.coffee`<br>
`scss/components/notify.scss`

##### Табы (Только скрипт)
Переключатель табов. Список с табами: ul > li. <br>
Контент: блок, в котором лежать .content блоки. Ссылка на этот блок вставляется в ul в качестве дата-аттрибута [data-tabs]
```
<ul data-tabs="#myTabs1">
    <li>Tab 1</li>
    <li>Tab 2</li>
    <li>Tab ..n</li>
</ul>
```
```
<div id="myTabs1">
    <div class="content">...</div>
    <div class="content">...</div>
<div>
```
`coffee/init/tabs.coffee`

##### Калькулятор
Скрипт для отработки кол-ва товаров в интернет-магазине
```
<div class="calculator" data-max="999" data-min="1">
	<span class="minus disabled">minus</span>
    <input type="text" maxlength="3" value="1" class="input">
	<span class="plus">plus</span>
</div>
```
`coffee/init/calculator.coffee`

##### Прогрессбар в стиле пирога
[data-time] - время<br>
[width] - ширина<br>
[height] - высота<br>
```
<canvas class="progress" data-time="1000" width="50" height="50"></canvas>
```
```
var progress1 = new Progress(canvas, time, callback, end);
```
`canvas` - канвас
`time` - время анимации
`callback` - коллбек, вызывается в каждом шаге анимации, аргументом отдает текущий шаг анимации (от 0 до 1)
`end` - коллбек, вызывается после окончания анимации
Для запуска - вызывать
```
progress1.start()
```
Второй вариант навешивания колбеков:
```
progress1.end = function(){
    // do stuff here
}
```
`coffee/init/progress.coffee`

##### Рейтинг
Рейтинг оценки по 5-бальной шкале
```
<ul class="clear rating">
    <li>1</li>
	<li class="active">2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
	<li class="text">4.0</li>
</ul>
```
`coffee/init/rating.coffee`

##### Image Raito
Скрипт который смотрит на пропорции картинок, и если нужно, выставляет класс .vertical картинкам.<br>
`.image-cover` - описан уже в `scss/skin.scss`<br>
`coffee/init/image-ratio.coffee`

##### Toggler
Скрипт, который переключает два блока по типу show / hide<br>
[data-toggle="show,hide"] - описывает какой блок скрыть, какой показать
```
<button data-toggle="tab1,tab2" class="active">tab 1</button>
<button data-toggle="tab2,tab1">tab 2</button>
```
```
<div data-toggled="tab1">...</div>
<div data-toggled="tab2" class="hidden">...</div>
```
`coffee/init/toggler.coffee`

##### Валидатор
Скрипт для валидации форм.<br>
Если все хорошо - вернется null, если есть какая-то ошибка - вернется строка с ошибкой.<br>
Ошибки описаны в словаре `errorsDictionary`.
```
<input type="text" data-minlength="2" maxlength="20" data-validate="name" required>
<input type="text" class="email">
<input type="text" data-mask="+9 (999) 999-99-99">
```
Поддерживает:
* name - имя, текст длинной от ... и до
* phone - валидирует по маске, тоесть длжен стоять еще и аттрибут data-mask
* email - валидирует email
* text - просто текст от ... и до
от - [data-minlength]<br>
до - стандартный аттрибут [maxlength]
```
var isNotValidInput = Validator(input); // null | string
```
`coffee/validator.coffee`

##### Раскладка Packery на SCSS
Маленький компонент, который позволяет раскидать плитки с помощью дата-аттрибутов
* `data-position="x,y"` - позиция плитки, измеряется шагом в 1 плитку (т.е 1,2,3...)
* `data-size="x,y"` - размеры плитки, измеряются шагом в 1 плитку (т.е 1,2,3...)<br>
Плитка data-size="2,2" - это плитка 2 * 2, data-size="2,1" - это плитка 2 * 1 и так далее<br>
Аттрибуты data-cols и data-rows у родителя указывают размеры блока, то есть data-cols="5" + data-rows="5" даст размер рдителя 5х5 плиток.<br>
<b>Важно!</b>: плитки подстраиваются под родителя а не наоборот.  
