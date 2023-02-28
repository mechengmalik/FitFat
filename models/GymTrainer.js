const { DataTypes } = require("sequelize");


const Gym = require("./Gym");
const Trainer = require("./Trainer");


module.exports = (sequelize) => {
     sequelize.define('GymTrainer', {
     
    GymId: {
      type: DataTypes.INTEGER,
      references: {
        model: Gym,
        key: 'Id'
      }
    },
    TrainerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Trainer,
        key: 'Id'
      }
    }
  },
  {timestamps: false} 
  );

}