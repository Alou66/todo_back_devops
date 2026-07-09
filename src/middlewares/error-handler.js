import { Prisma } from "@prisma/client"
import { ApiError } from "../helpers/http-error.js"

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: { message: err.message, details: err.details } })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: { message: "Cette valeur existe déjà.", details: err.meta } })
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: { message: "Ressource introuvable." } })
    }
  }

  console.error(err)
  return res.status(500).json({ error: { message: "Erreur interne du serveur." } })
}
