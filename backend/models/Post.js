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
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
            defaultValue: []
        },
        // comments field will be an array of object
        comments: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
            defaultValue: []
        }

        // comments: {
        //     type: DataTypes.STRING,
        //     get: function () {
        //         return JSON.parse(this.getDataValue('comments'))
        //     },
        //     set: function (val) {
        //         return this.setDataValue('comments', JSON.stringify(val))
        //     }
        // }
    },
    {
        freezeTableName: true,
    }
    )

    return Post
}