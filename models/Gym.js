const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    const Gym =
    sequelize.define('Gym', {
        

        gymName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING

        },
        phoneNum: {
            type: DataTypes.STRING,
            allowNull: false

        }},
        
        {timestamps: false} 
    );
    return Gym;
}

