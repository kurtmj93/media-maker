const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}

Post.init(
 {
    pics: {
        type: DataTypes.STRING,
    },
    vids: {
        type:DataTypes.STRING, 
    },
    message: {
        type: DataTypes.STRING,
    }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
        }
    
  
);

module.exports = Post;