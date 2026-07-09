import { Router } from "express"
import { memberRouter } from "../modules/members/member.routes.js"
import { labelRouter } from "../modules/labels/label.routes.js"
import { taskRouter } from "../modules/tasks/task.routes.js"

export const apiRouter = Router()

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Vérifie que l'API est en ligne
 *     responses:
 *       200:
 *         description: OK
 */
apiRouter.get("/health", (req, res) => res.json({ status: "ok" }))

apiRouter.use("/members", memberRouter)
apiRouter.use("/labels", labelRouter)
apiRouter.use("/tasks", taskRouter)
