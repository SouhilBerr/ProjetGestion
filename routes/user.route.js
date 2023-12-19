// Importation du module Router d'Express et des contrôleurs nécessaires
import { Router } from 'express';
import { registerUser, loginUser, deleteUser, updateUser } from '../controllers/user.controller.js';

// Importation des middlewares d'authentification et d'autorisation
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorize } from '../middlewares/authorize.js';

// Création d'un nouveau routeur Express
const router = Router();



// Route pour l'inscription des utilisateurs
router.post('/signup', registerUser);

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

// Route pour mettre à jour un utilisateur
// Protégée par l'authentification (authenticateToken) et l'autorisation (authorize)
router.put('/update/:id', authenticateToken, authorize(['admin']), updateUser);

// Route pour supprimer un utilisateur
// De même, protégée par l'authentification et l'autorisation
router.delete('/delete/:id', authenticateToken, authorize(['admin']), deleteUser);

// Exportation du routeur pour une utilisation dans l'application principale
export default router;
