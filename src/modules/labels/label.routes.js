import { Router } from "express"
import { asyncHandler } from "../../helpers/async-handler.js"
import { validate } from "../../middlewares/validate.js"
import { labelController } from "./label.controller.js"
import { createLabelSchema, updateLabelSchema, idParamSchema } from "./label.dto.js"

export const labelRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Labels
 *   description: Étiquettes de tâches
 */

/**
 * @swagger
 * /labels:
 *   get:
 *     summary: Liste les étiquettes
 *     tags: [Labels]
 *     responses:
 *       200:
 *         description: Liste des étiquettes
 */
labelRouter.get("/", asyncHandler(labelController.list))

/**
 * @swagger
 * /labels:
 *   post:
 *     summary: Crée une étiquette
 *     tags: [Labels]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Étiquette créée
 */
labelRouter.post("/", validate(createLabelSchema), asyncHandler(labelController.create))

/**
 * @swagger
 * /labels/{id}:
 *   patch:
 *     summary: Met à jour une étiquette
 *     tags: [Labels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Étiquette mise à jour
 */
labelRouter.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateLabelSchema),
  asyncHandler(labelController.update)
)

/**
 * @swagger
 * /labels/{id}:
 *   delete:
 *     summary: Supprime une étiquette
 *     tags: [Labels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Étiquette supprimée
 */
labelRouter.delete("/:id", validate(idParamSchema, "params"), asyncHandler(labelController.remove))
