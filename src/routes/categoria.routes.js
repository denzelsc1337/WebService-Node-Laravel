import { Router } from "express";
import  { 
    getCategories, 
    getCategoryXID, 
    insertCategoria, 
    updateCategoria,
} from "../controllers/categoria.contoller.js";

const router = Router();

router.get('/categorias', getCategories );

router.get('/categorias/:cat_id', getCategoryXID );

router.post('/categorias',insertCategoria );

router.put('/categoriaUpdate', updateCategoria );


export default router;
