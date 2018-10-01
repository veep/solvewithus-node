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

module.exports.User = sequelize.define(
  'user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    google_name: { type: Sequelize.TEXT },
    google_id: { type: Sequelize.TEXT },
    display_name: { type: Sequelize.TEXT },
    admin: {type: Sequelize.BOOLEAN}
  }
);

module.exports.Team = sequelize.define(
  'team', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    display_name: { type: Sequelize.TEXT },
    google_group: { type: Sequelize.TEXT },
    chat_id: { type: Sequelize.INTEGER }
  }
);

module.exports.Chat = sequelize.define(
  'chat', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}
  }
);

module.exports.Message = sequelize.define(
  'message', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    chat_id: { type: Sequelize.INTEGER },
    type: { type: Sequelize.TEXT },
    text: { type: Sequelize.TEXT },
    user_id: { type: Sequelize.INTEGER }
  }
);

  
sequelize.sync();
module.exports.sequelize = sequelize;
