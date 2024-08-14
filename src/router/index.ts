import { Router } from "express";

import authentication from "./auth";

const router = Router();

export default (): Router => {
    authentication(router);
    return router;
}