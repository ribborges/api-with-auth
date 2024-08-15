import { Router } from "express";

import authentication from "./auth";
import users from "./users";

const router = Router();

export default (): Router => {
    authentication(router);
    users(router);
    return router;
}