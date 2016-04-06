import $ from 'jquery';
import Menu from 'menu';
import getElementFromTemplate from 'templates';

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

MenuItem.prototype._init = function() {
  this._linkElement = this.element.children('a');
  this.element.on('click', this._onClick);

  if (this.subMenu) {
    this.element.addClass('main-navigation__menu-item--has-child');
  }
};

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

MenuItem.prototype.subMenu = null;

MenuItem.prototype._onClick = function(event) {
  if (this.subMenu) {
    event.preventDefault();
    this.subMenu.toggle();
  }
};

MenuItem.prototype.hideSubMenu = function() {
  if (this.subMenu) {
    this.subMenu.hide();
  }
};

export default MenuItem;
