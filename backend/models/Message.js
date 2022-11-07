module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        message_id: {
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
        messages: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'messages cannot be empty'
                }
            },
            defaultValue: []
        },
        user_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'user_ids cannot be empty'
                }
            },
            limit: {
                args: 2,
            },
            defaultValue: []
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    })
    return Message
}