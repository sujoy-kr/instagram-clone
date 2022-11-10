module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('notification', {
        notification_id: {
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
        notifications: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
            defaultValue: []
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'user_id cannot be empty'
                }
            }
        }
    }, {
        timestamps: true,
        freezeTableName: true,
    })
    return Notification
}