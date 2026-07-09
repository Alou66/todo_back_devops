import { z } from "zod"

export const idParamSchema = z.object({
  id: z.uuid("Identifiant invalide"),
})

export const createMemberSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis"),
  email: z.email("Email invalide"),
  role: z.string().trim().min(1, "Le rôle est requis"),
  color: z.string().trim().min(1, "La couleur est requise"),
})

export const updateMemberSchema = createMemberSchema.partial()
