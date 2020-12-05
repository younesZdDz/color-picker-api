import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database';

const tableName = 'users';

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        displayName: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
    },
    {
        // Other model options go here
        tableName,
    },
);
export default User;
