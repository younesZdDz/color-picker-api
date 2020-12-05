import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database';
import User from '../auth/model';

const tableName = 'palettes';

const Palette = sequelize.define(
    'Palette',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        paletteName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emoji: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        colors: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
    },
    {
        tableName,
    },
);

Palette.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
});
export default Palette;
