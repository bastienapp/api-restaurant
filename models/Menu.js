const CrudDao = require('./CrudDao');

class Menu extends CrudDao {
  static table = 'menu';

  constructor(id, title, idRestaurant) {
    this.id = id;
    this.title = title;
    this.idRestaurant = idRestaurant;
  }
}

module.exports = Menu;
