const Sequelize = require('sequelize');
const sequelize = new Sequelize('puzzles', undefined, undefined, { storage: ".data/puzzles.db", operatorsAliases: false, dialect: 'sqlite' } );

sequelize
  .authenticate()
  .then(() => {
    console.log('db opened ok');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// CREATE TABLE user ( id integer primary key, google_name, google_id, display_name);

const User = sequelize.define(
  'user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    google_name: { type: Sequelize.STRING },
    google_id: { type: Sequelize.STRING },
    display_name: { type: Sequelize.STRING },
    admin: {type: Sequelize.BOOLEAN}
  }
);
sequelize.sync();
module.exports.sequelize = sequelize;
module.exports.User = User;