const restaurants = require('../controllers/restaurants');
const menus = require('../controllers/menus');

module.exports = (app) => {
  app.use('/restaurants', restaurants);
  app.use('/menus', menus);
};
