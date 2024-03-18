import { Router } from "express";

import {getPerifericos} from "../controllers/periferico.controller.js";


const router = Router();

router.get('/perifericos', getPerifericos );

export default router;