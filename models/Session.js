const { DataTypes } = require("sequelize");
const { gym, trainer, session } = require("../sequilize");

module.exports = (sequelize) => {
  const Session = sequelize.define('Session', {
    // Model attributes are defined here
    sessionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    capacity:{
      type: DataTypes.INTEGER,
      allowNull: false

    },
    type: {
        type:DataTypes.STRING,
        allowNull:false

    },

       
  },    {timestamps: false} 
  );

  return Session;

  
}