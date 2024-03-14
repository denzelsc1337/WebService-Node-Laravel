import { Router } from "express";

import {getPerifericos} from "../controllers/perfiferico.controller.js";


const router = Router();

router.get('/perifericos', getPerifericos );

export default router;