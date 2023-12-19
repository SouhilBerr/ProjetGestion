
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

const User = sequelize.define('User', {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'utilisateur'),
    defaultValue: 'utilisateur', 
  },
});

export default User;
