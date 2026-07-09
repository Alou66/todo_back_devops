import { Router } from "express"
import { asyncHandler } from "../../helpers/async-handler.js"
import { validate } from "../../middlewares/validate.js"
import { taskController } from "./task.controller.js"
import { createTaskSchema, updateTaskSchema, reorderTasksSchema, idParamSchema } from "./task.dto.js"

export const taskRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Tâches du tableau Kanban
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Liste les tâches
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Liste des tâches
 */
taskRouter.get("/", asyncHandler(taskController.list))

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crée une tâche
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Tâche créée
 */
taskRouter.post("/", validate(createTaskSchema), asyncHandler(taskController.create))

/**
 * @swagger
 * /tasks/reorder:
 *   put:
 *     summary: Enregistre en masse le statut/ordre des tâches après un drag & drop
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Liste des tâches mise à jour
 */
taskRouter.put("/reorder", validate(reorderTasksSchema), asyncHandler(taskController.reorder))

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Met à jour une tâche
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tâche mise à jour
 */
taskRouter.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateTaskSchema),
  asyncHandler(taskController.update)
)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Supprime une tâche
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tâche supprimée
 */
taskRouter.delete("/:id", validate(idParamSchema, "params"), asyncHandler(taskController.remove))
