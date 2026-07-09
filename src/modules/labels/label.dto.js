import { z } from "zod"

export const idParamSchema = z.object({
  id: z.uuid("Identifiant invalide"),
})

export const createLabelSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis"),
  color: z.string().trim().min(1, "La couleur est requise"),
})

export const updateLabelSchema = createLabelSchema.partial()
