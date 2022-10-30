module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'user',
                key: 'user_id'
            }
        }
    })

    return Post
}