const { DataTypes } = require("sequelize");
const { trainer, gym, session } = require("../sequilize");

module.exports = (sequelize) => {
    const Trainer = sequelize.define('Trainer', {

    trainerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experiance: {
      type: DataTypes.INTEGER
    },
    bio :{
      type: DataTypes.STRING,
      allowNull: false

    },
    phoneNum:{
        type:DataTypes.INTEGER,
        
    }},

    {timestamps: false} 
  );

 return Trainer;
}