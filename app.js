// Importations des dépendances nécessaires
import express from 'express'; // Framework Express pour créer l'application serveur
import bodyParser from 'body-parser'; // Middleware pour analyser le corps des requêtes entrantes
import { errorHandler } from './middlewares/errorHandler.js'; // Middleware pour la gestion des erreurs
import { sequelize } from './config/config.js'; // Configuration Sequelize pour la base de données
import { config } from 'dotenv'; // Module pour charger les variables d'environnement du fichier .env
import authRouter from './routes/user.route.js'; 
import livrerouter from './routes/livre.route.js'; 
import auteurRouter from './routes/auteur.route.js'; 
import cors from 'cors'

// Chargement des variables d'environnement
config();

// Création d'une instance de l'application Express
const app = express();

app.use(cors());


// Utilisation de bodyParser pour analyser les requêtes JSON entrantes
app.use(bodyParser.json());

// Définition des routes pour la gestion des livre
app.use('/api/livre', livrerouter);

// Définition des routes pour la gestion de l'auteur
app.use('/api/auteur', auteurRouter);

// Définition des routes pour l'authentification
app.use('/api/auth', authRouter);

// Utilisation du middleware pour la gestion des erreurs
app.use(errorHandler);

// Définition du port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`)); // Démarrage du serveur sur le port spécifié
});

