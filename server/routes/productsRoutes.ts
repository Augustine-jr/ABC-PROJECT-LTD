import { Router, RequestHandler } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = Router();

// Routes
router.get('/', getAllProducts as RequestHandler);
router.get('/:id', getProductById as RequestHandler);
router.post('/', createProduct as RequestHandler);
router.patch('/:id', updateProduct as RequestHandler);
router.delete('/:id', deleteProduct as RequestHandler);

export default router;
