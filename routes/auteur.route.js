import { Router } from 'express';
import {
getAllAuteur,
getAuteurById,
createAuteur,
updateAuteur,
deleteAuteur,
} from '../controllers/auteur.controller.js';

const router = Router();

router.get('/', getAllAuteur);
router.get('/:id', getAuteurById);
router.post('/', createAuteur);
router.put('/:id', updateAuteur);
router.delete('/:id', deleteAuteur);

export default router;
