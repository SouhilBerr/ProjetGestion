import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import Auteur from './auteur.model.js'; 

const Livre = sequelize.define('Livre', {
  idlivre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING(255),
    validate: {
      len: [3, Infinity], 
    },
  },
  idauteur: {
    type: DataTypes.INTEGER,
    references: {
      model: Auteur, 
      key: 'idauteur', 
    },
  },
  annee: {
    type: DataTypes.INTEGER, 
  },
  genre: {
    type: DataTypes.STRING(100),
  },
}, {
  timestamps: false,
});

export default Livre;
