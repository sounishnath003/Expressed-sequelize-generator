import { Router, static as st } from "express";
import createHttpError from "http-errors";
import { SUCCESS } from "../utils";

const router = Router();

router.get("/data", async (req, res, next) => {
    try {
        res.status(200).send({
            ...SUCCESS,
            msg: "server is running",
            ip: req.ip,
            timestamp: Date.now(),
        });
    } catch (error) {
        next(createHttpError.InternalServerError);
    }
    next();
});

// Controllers

export default router;
