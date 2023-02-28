const { Sequelize, Model } = require('sequelize');

const sequelize =  new Sequelize('mydb','postgres','0000',{
    host:'localhost',
    port:5432,
    dialect:'postgres'
  }) ;
  
  // try {
  //    sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }
  const User = require('./models/User')(sequelize)
  const Gym = require('./models/Gym')(sequelize)
  

  const Trainer = require('./models/Trainer')(sequelize)

  const Session = require('./models/Session')(sequelize)
  const GymTrainer = require('./models/GymTrainer')(sequelize)


  Gym.hasMany(Session,{onDelete:'CASCADE'});
  Session.belongsTo(Gym,{onDelete:'CASCADE'});

  Trainer.belongsToMany(Gym,{ through:'GymTrainer',onDelete:'CASCADE'});
  Gym.belongsToMany(Trainer, {through:'GymTrainer',foreignKey:'GymId',onDelete:'CASCADE'})
  Trainer.hasMany(Session,{onDelete:'CASCADE',foreignKey:'TrainerId'});
  Session.belongsTo(Trainer,{onDelete:'CASCADE'});


  
// sequelize.sync({alter:true}).then(console.log('DB is synced'));
const db = {};
db.sequelize = sequelize;
db.user = User;
db.gym = Gym;
db.session = Session;
db.trainer = Trainer;
db.gymTrainer = GymTrainer;
module.exports = db;