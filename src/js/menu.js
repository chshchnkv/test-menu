import getElementFromTemplate from 'templates';
import $ from 'jquery';
import MenuItem from 'menu-item';

function Menu(menuElement) {
  this._onClick = this._onClick.bind(this);

  if (menuElement) {
    this.element = menuElement;

    var itemsElements = this.element.children('.main-navigation__menu-item');

    itemsElements.each((n, e) => {
      this.items.push(new MenuItem(e));
    });

    this._init();
  }
}

Menu.prototype._init = function() {
  this.element.context.addEventListener('click', this._onClick, true);

};

Menu.prototype.items = [];

Menu.prototype.show = function() {
  this.element.slideDown('fast');
};

Menu.prototype.hide = function() {
  this.element.slideUp('fast');
};

Menu.prototype.toggle = function() {
  this.element.slideToggle('fast');
};

Menu.prototype._onClick = function(event) {
  var otherItems = this.items.filter((item) => {
    return !$.contains(item.element.context, event.target);
  });

  otherItems.forEach((item) => {
    item.hideSubMenu();
  });
};

Menu.prototype.render = function() {
  this.element = $(getElementFromTemplate('template-sub-menu'));
  this._init();
  return this.element;
};

Menu.prototype.addItem = function(itemData, subItemsData) {
  var newItem = new MenuItem();
  this.element.append(newItem.render(itemData, subItemsData));
  this.items.push(newItem);
};

export default Menu;
