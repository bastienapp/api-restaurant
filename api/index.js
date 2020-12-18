const restaurants = require('./routes/restaurants');
const menus = require('./routes/menus');

module.exports = (app) => {
  app.use('/restaurants', restaurants);
  app.use('/menus', menus);
};
