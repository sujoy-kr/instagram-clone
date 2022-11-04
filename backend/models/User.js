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
            notEmpty: {
                args: true,
                msg: 'username cannot be empty'
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
                notEmpty: {
                    args: true,
                    msg: 'password cannot be empty'
                },
                min: {
                    args: 8,
                    msg: 'password must be at least 8 characters long'
                }
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'name cannot be empty'
                },
            },
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'email cannot be empty'
                },
            },
            unique: {
                args: true,
                msg: 'email already in use'
            }
        },
        posts: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        followers: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,

        },
        followings: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true,

        }
    },
    {
        freezeTableName: true,
    })

    User.prototype.toJSON = function () {
        let values = Object.assign({}, this.get())

        delete values.password
        delete values.updatedAt
        delete values.createdAt
        return values
    }

    return User
}
