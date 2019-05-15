const Sequelize = require('sequelize');


const sequelize = new Sequelize('api', 'me', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// var db = require('./models')
//  db.User.create({name: 'joe', email: 'test@example.com'}).then((err, res) => {
//    console.log(err, res)
//  })

//  const User = sequelize.define('user', {
//   name: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING
//   }
// });

 module.exports = sequelize;
 global.sequelize = sequelize;
