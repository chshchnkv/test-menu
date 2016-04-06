import $ from 'jquery';
import Menu from 'menu';

var menu = new Menu($('.menu'));


$.ajax({
  url: 'js/menu-content.json',
  dataType: 'json',
  success: (data) => {
    menu.addItem({name: 'Test', url: '#'}, data);
  }
});
