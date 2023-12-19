import { Router } from 'express';
import {
getAllLivre,
getLivreById,
createLivre,
updateLivre,
deleteLivre,
} from '../controllers/livre.controller.js';

const router = Router();

router.get('/', getAllLivre);
router.get('/:id', getLivreById);
router.post('/', createLivre);
router.put('/:id', updateLivre);
router.delete('/:id', deleteLivre);

export default router;





