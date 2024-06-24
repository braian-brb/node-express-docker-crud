import { Router } from 'express';
import * as viewController from '../controllers/viewController.js';

const router = Router();

router.get('/products', viewController.renderAllProducts);
router.get('/products/new', viewController.renderNewProductForm);
router.post('/products', viewController.createProduct);
router.post('/products/deleteAll', viewController.deleteAllProducts);

export default router;
