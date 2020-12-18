const CrudDao = require('./CrudDao');

class Restaurant extends CrudDao {
  static table = 'restaurant';

  constructor(id, name, city) {
    this.id = id;
    this.name = name;
    this.city = city;
  }
}

module.exports = Restaurant;
