import { Router } from "express";

import {getInfoLocation} from "../controllers/location.controller.js";

const router = Router();


router.get('/location/:id_cli', getInfoLocation );

export default router;
