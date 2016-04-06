import getElementFromTemplate from 'templates';
import $ from 'jquery';
import MenuItem from 'menu-item';

/**
 * Класс для объекта Меню
 * @param {JQuery} [menuElement] Элемент меню на станице
 */
function Menu(menuElement) {
  this._onClick = this._onClick.bind(this);

  if (menuElement) {
    this.element = menuElement;

    var itemsElements = this.element.children('.menu__item');

    itemsElements.each((n, e) => {
      this.items.push(new MenuItem(e));
    });

    this._init();
  }
}

/**
 * Инициализация компонента
 * @private
 */
Menu.prototype._init = function() {
  document.addEventListener('click', this._onClick, true);
};

Menu.prototype.items = [];

/**
 * Показать меню на экране
 */
Menu.prototype.show = function() {
  this.element.slideDown('fast');
};

/**
 * Скрыть меню с экрана
 */
Menu.prototype.hide = function() {
  this.element.slideUp('fast');
};

/**
 * Переключить видимость меню
 */
Menu.prototype.toggle = function() {
  this.element.slideToggle('fast');
};

/**
 * Проверяет видимость меню на экране
 * @returns {boolean} true если меню отображается, false - если нет
 */
Menu.prototype.isOpened = function() {
  return this.element.is(':visible');
};

/**
 * Обработчик щелчка по меню, закрывает элементы меню, которые не являются таргетом события
 * @private
 * @param   {Event}    event - событие щелчка
 */
Menu.prototype._onClick = function(event) {
  if ($.contains(this.element[0], event.target)) {
    var otherItems = this.items.filter((item) => {
      return !$.contains(item.element[0], event.target);
    });

    otherItems.forEach((item) => {
      item.close();
    });
  } else {
    var mql = window.matchMedia('(min-width: 600px)');
    if (mql.matches) {
      this.items.forEach((item) => {
        item.close();
      });
    }
  }
};

/**
 * Генерирует элемент меню из шаблона
 * @returns {JQuery} элемент меню
 */
Menu.prototype.render = function() {
  this.element = $(getElementFromTemplate('template-sub-menu'));
  this._init();
  return this.element;
};

/**
 * Удаляет меню и очищает обработчики
 */
Menu.prototype.remove = function() {
  this._onClick = null;
  this.items.forEach((item) => {
    item.remove();
  });
};

/**
 * Добавляет элемент в меню
 * @param {object} itemData     данные добавляемого элемента
 * @param {?Array}  subItemsData элементы подменю
 */
Menu.prototype.addItem = function(itemData, subItemsData) {
  var newItem = new MenuItem();
  this.element.append(newItem.render(itemData, subItemsData));
  this.items.push(newItem);
};

export default Menu;
