import Auteur from '../models/auteur.model.js';

export const createAuteur = async (req, res) => {
    try {
        // Validation des données entrantes (req.body) peut être ajoutée ici
        const newAuteur = await Auteur.create(req.body);
        res.status(201).json(newAuteur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du Auteur", error: error.message });
    }
};

// Obtenir tous les Auteurs
export const getAllAuteur = async (req, res) => {
    try {
        const newAuteur = await Auteur.findAll();
        res.status(200).json(newAuteur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des Auteurs", error: error.message });
    }
};


// Obtenir un Auteur par ID
export const getAuteurById = async (req, res) => {
    try {
        const idProduit = req.params.id;
        const newAuteur = await Auteur.findByPk(idProduit);
        if (newAuteur) {
            res.status(200).send(newAuteur);
        } else {
            res.status(404).send({ message: 'Auteur non trouvé' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Supprimer un Auteur



export const deleteAuteur = async (req, res, next) => {
  try {
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      await auteur.destroy();
      res.status(200).json({ message: 'Auteur supprimé' });
    } else {
      res.status(404).json({ message: 'Auteur non trouvé' });
    }
  } catch (error) {
    next(error);
  }
};



// Mettre à jour un Auteur


export const updateAuteur = async (req, res, next) => {
    try {
      const newAuteur = await Auteur.findByPk(req.params.id);
      if (newAuteur) {
        await newAuteur.update(req.body);
        res.status(200).json(newAuteur);
      } else {
        res.status(404).json({ message: 'Produit not found' });
      }
    } catch (error) {
      next(error);
    }
  };