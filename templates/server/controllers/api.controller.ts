import { Router, static as st } from "express";

const router = Router();

router.get("/data", async (req, res, next) => {
    try {
        res.status(200).send({
            msg: "server is running",
            status: "OK",
            statusCode: 200,
            ip: req.ip,
            timestamp: Date.now(),
        });
    } catch (error) {
        res.status(500).send({ error });
    }
    next();
});

// Controllers

export default router;
