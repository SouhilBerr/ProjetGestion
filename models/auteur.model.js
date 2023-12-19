import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
 

const Auteur = sequelize.define('Auteur', {
  idauteur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(255),
   
  },
  biographie: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

export default Auteur;
