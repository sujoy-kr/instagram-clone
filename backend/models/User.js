module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
            unique: {
                args: true,
                msg: 'id already in use'
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            unique: {
                args: true,
                msg: 'username already in use'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            unique: {
                args: true,
                msg: 'email already in use'
            }
        },
        posts: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,
            references: {
                model: 'post',
                key: 'post_id'
            }
        }
    })
    
    return User
}
