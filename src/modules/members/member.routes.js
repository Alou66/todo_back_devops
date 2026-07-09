import { Router } from "express"
import { asyncHandler } from "../../helpers/async-handler.js"
import { validate } from "../../middlewares/validate.js"
import { memberController } from "./member.controller.js"
import { createMemberSchema, updateMemberSchema, idParamSchema } from "./member.dto.js"

export const memberRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Membres de l'équipe
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Liste les membres
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Liste des membres
 */
memberRouter.get("/", asyncHandler(memberController.list))

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Crée un membre
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Membre créé
 */
memberRouter.post("/", validate(createMemberSchema), asyncHandler(memberController.create))

/**
 * @swagger
 * /members/{id}:
 *   patch:
 *     summary: Met à jour un membre
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Membre mis à jour
 */
memberRouter.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateMemberSchema),
  asyncHandler(memberController.update)
)

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Supprime un membre
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Membre supprimé
 */
memberRouter.delete("/:id", validate(idParamSchema, "params"), asyncHandler(memberController.remove))
