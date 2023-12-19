// Dans votre fichier livre.controller.js

import Livre from '../models/livre.model.js'; // Assurez-vous que ce chemin est correct

// Fonction pour créer un livre
export const createLivre = async (req, res) => {
  try {
    const { titre, idauteur, annee, genre } = req.body;

    // Utilisation de la méthode create du modèle Livre
    const nouveauLivre = await Livre.create({ titre, idauteur, annee, genre });

    res.status(201).json(nouveauLivre);
  } catch (error) {
    console.error('Erreur lors de la création du livre:', error);
    res.status(500).json({ message: 'Erreur lors de la création du livre', error });
  }
};

// Obtenir tous les Livres
export const getAllLivre = async (req, res) => {
    try {
        const newLivre = await Livre.findAll();
        res.status(200).json(newLivre);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des Livres", error: error.message });
    }
};


// Obtenir un Livre par ID
export const getLivreById = async (req, res) => {
    try {
        const idProduit = req.params.id;
        const newLivre = await Livre.findByPk(idProduit);
        if (newLivre) {
            res.status(200).send(newLivre);
        } else {
            res.status(404).send({ message: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un Livre



export const deleteLivre = async (req, res, next) => {
    try {
      const newLivre = await Livre.findByPk(req.params.id);
      if (newLivre) {
        await newLivre.destroy();
        res.status(200).json({ message: 'Produit deleted' });
      } else {
        res.status(404).json({ message: 'Produit not found' });
      }
    } catch (error) {
      next(error);
    }
  };



// Mettre à jour un Livre


export const updateLivre = async (req, res, next) => {
    try {
      const newLivre = await Livre.findByPk(req.params.id);
      if (newLivre) {
        await newLivre.update(req.body);
        res.status(200).json(newLivre);
      } else {
        res.status(404).json({ message: 'Produit not found' });
      }
    } catch (error) {
      next(error);
    }
  };