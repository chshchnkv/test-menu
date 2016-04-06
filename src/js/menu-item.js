import $ from 'jquery';
import Menu from 'menu';
import getElementFromTemplate from 'templates';

/**
 * Класс пункта меню
 * @param {JQuery} [element] элемент для пункта меню
 */
function MenuItem(element) {
  this._onClick = this._onClick.bind(this);

  if (element) {
    this.element = $(element);

    var subMenuElement = this.element.find('.sub-menu');
    if (subMenuElement.length > 0) {
      this.subMenu = new Menu(subMenuElement);
    }
    this._init();
  }
}

MenuItem.prototype.subMenu = null;

/**
 * Инициализация компонента
 * @private
 */
MenuItem.prototype._init = function() {
  this._linkElement = this.element.children('a');
  this.element.on('click', this._onClick);

  if (this.subMenu) {
    this.element.addClass('main-navigation__menu-item--has-child');
  }
};

/**
 * Генерирует элемент для пункта меню из шаблона
 * @param {object} itemData     данные добавляемого элемента
 * @param {Array} [subItemsData] элементы подменю
 * @returns {JQuery} элемент пункта меню
 */
MenuItem.prototype.render = function(itemData, subItemsData) {
  this.element = $(getElementFromTemplate('template-menu-item'));

  if (subItemsData) {
    this.subMenu = new Menu();
    this.element.append(this.subMenu.render());

    subItemsData.forEach((item) => {
      this.subMenu.addItem(item);
    });
  }
  this._init();

  this._linkElement.text(itemData.name);
  this._linkElement.attr('href', itemData.url);

  return this.element;
};

/**
 * Удаляет пункт меню
 */
MenuItem.prototype.remove = function() {
  this._onClick = null;
  if (this.subMenu) {
    this.subMenu.remove();
  }
};

/**
 * Обработчик щелчка по пункту меню. Открывает/скрывает подменю, если есть.
 * @private
 */
MenuItem.prototype._onClick = function() {
  if (this.subMenu) {
    if (this.subMenu.isOpened()) {
      this.close();
    } else {
      this.open();
    }
  }
};

/**
 * Открывает подменю пункта
 */
MenuItem.prototype.open = function() {
  if (this.subMenu) {
    this.element.addClass('main-navigation__menu-item--opened');
    this.subMenu.show();
  }
};

/**
 * Скрывает подменю пункта
 */
MenuItem.prototype.close = function() {
  if (this.subMenu) {
    this.element.removeClass('main-navigation__menu-item--opened');
    this.subMenu.hide();
  }
};

export default MenuItem;
