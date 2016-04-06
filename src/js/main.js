import $ from 'jquery';
import Menu from 'menu';

var menu = new Menu($('.main-navigation__menu'));

$.ajax({
  url: '/js/menu-content.json',
  dataType: 'json'
}).done((data) => {
  menu.addItem({name: 'Test', url: '#'}, data);
});
