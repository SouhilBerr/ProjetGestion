
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/user.medel.js'; 


const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (req, res) => {
    try {
      // Récupération des données d'inscription de l'utilisateur
      const {  email, password, role} = req.body;
  
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Création de l'utilisateur avec le mot de passe haché
      const newUser = await User.create({
       
        email,
        password: hashedPassword,

        role ,
      });
  
      // Réponse avec le statut 201 (Created) et les données de l'utilisateur créé
      //res.status(201).json(newUser);
  
      res.status(201).json({ message: 'Compte cree avec succes',  newUser});
      
    } catch (error) {
      // En cas d'erreur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
    }
  };
  export const loginUser = async (req, res) => {
    try {
      // Récupération des données de connexion
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par son email
      const user = await User.findOne({ where: { email } });
  
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Vérification si le mot de passe est correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      // Si le mot de passe est incorrect, renvoie une erreur 400
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }
  
      // Si le mot de passe est correct, création d'un token JWT
      const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, secret, { expiresIn: '1h' });
  
      // Renvoie les informations de l'utilisateur et le token
      res.status(200).json({ message: 'Connexion réussie', result: user, token });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
  };
  
  
  export const updateUser = async (req, res) => {
    // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
    const { id } = req.params;
    // Récupération des données à mettre à jour
    const { nom, prenom, telephone, password, role } = req.body;
  
    try {
      // Recherche de l'utilisateur par son ID
      const user = await User.findByPk(id);
  
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Hachage du nouveau mot de passe s'il est fourni, sinon utilise le mot de passe actuel
      const hashedPassword = password ? await bcrypt.hash(password, 12) : user.password;
  
      // Mise à jour de l'utilisateur avec les nouvelles données
      const updatedUser = await user.update({ nom, prenom, telephone, password: hashedPassword, role });
  
      // Renvoie les informations de l'utilisateur mis à jour
      res.status(200).json({ result: updatedUser });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
    }
  };
  
  
  
  
  
  
  
  
  // // Méthode pour modifier un utilisateur
  // export const updateUser = async (req, res) => {
  //   // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
  //   const { id } = req.params;
  //   // Récupération des données à mettre à jour
  //   const { password, role } = req.body;
  
  //   try {
  //     // Recherche de l'utilisateur par son ID
  //     const user = await User.findByPk(id);
  
  //     // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
  //     if (!user) {
  //       return res.status(404).json({ message: 'Utilisateur non trouvé' });
  //     }
  
  //     // Hachage du nouveau mot de passe s'il est fourni, sinon utilise le mot de passe actuel
  //     const hashedPassword = password ? await bcrypt.hash(password, 12) : user.password;
  
  //     // Mise à jour de l'utilisateur avec les nouvelles données
  //     const updatedUser = await user.update({ password: hashedPassword, role });
  
  //     // Création d'un nouveau token JWT pour l'utilisateur mis à jour
  //     const token = jwt.sign({ email: updatedUser.email, id: updatedUser.id, role: updatedUser.role }, secret, { expiresIn: '1h' });
  
  //     // Renvoie les informations de l'utilisateur mis à jour et le nouveau token
  //     res.status(200).json({ result: updatedUser, token });
  //   } catch (error) {
  //     // En cas d'erreur, renvoie une réponse d'erreur
  //     res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
  //   }
  // };
  
  // Méthode pour supprimer un utilisateur
  export const deleteUser = async (req, res) => {
    // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
    const { id } = req.params;
  
    try {
      // Recherche de l'utilisateur par son ID
      const user = await User.findByPk(id);
  
      // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Suppression de l'utilisateur
      await user.destroy();
  
      // Renvoie une confirmation de la suppression
      res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur', error });
    }
  };
  